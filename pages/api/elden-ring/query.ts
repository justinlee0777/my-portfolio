import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatCompletionMessageParam } from 'openai/resources';
import getOpenAIApi from '../../../src/api/openai/open-ai.client';
import {
  EldenRingEmbeddings,
  EldenRingEmbeddingsModel,
} from '../../../src/models/elden-ring-embeddings.model';
import connectToMongoDB from '../../../src/page-utils/prospero/connect-to-mongodb.function';

/**
 * https://github.com/langchain-ai/langchainjs/blob/160c83c29e5000252bc4fa54bce41b4008f573f8/libs/langchain-mongodb/src/vectorstores.ts#L52
 */
function fixArrayPrecision(array: number[]): Array<number> {
  return array.map((value) => {
    if (Number.isInteger(value)) {
      return value + 0.000000000000001;
    }
    return value;
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { embeddings, chat } = getOpenAIApi();

    const {
      messages,
    }: { query: string; messages?: Array<ChatCompletionMessageParam> } =
      req.body;

    // Assuming last message will always be a user's.
    const query = messages.at(-1);

    const queryEmbeddingsResponse = await embeddings.create({
      input: query.content as string,
      model: 'text-embedding-3-small',
    });

    await connectToMongoDB();

    let results: Array<EldenRingEmbeddings & { score: number }> =
      await EldenRingEmbeddingsModel.aggregate([
        {
          $vectorSearch: {
            index: 'default',
            path: 'embedding',
            limit: 3,
            numCandidates: 30,
            queryVector: fixArrayPrecision(
              queryEmbeddingsResponse.data.at(0).embedding
            ),
          },
        },
        {
          $set: {
            score: { $meta: 'vectorSearchScore' },
          },
        },
        {
          $unset: ['embedding'],
        },
      ]);

    results = results.filter((result) => result.score > 0.5);

    const finalMessages = messages.slice(-1).concat({
      content: `
        Please answer the query using only the provided texts.
        ---
        Query: ${query.content}
        ${results.map(
          (result, i) => `---
          Text ${i + 1}: ${result.text}
          `
        )}
      `,
      role: 'user',
    });
    console.log({
      finalMessage: finalMessages.at(-1),
    });
    const completionsResponse = await chat.completions.create({
      model: 'gpt-4o-mini',
      messages: finalMessages,
    });

    res.status(200).json(completionsResponse.choices.at(0).message.content);
  } else {
    res.status(404).end();
  }
}
