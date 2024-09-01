import { NextRequest } from 'next/server';
import {
  ChatCompletionChunk,
  ChatCompletionMessageParam,
} from 'openai/resources';
import getOpenAIApi from '../../../../src/api/openai/open-ai.client';
import {
  EldenRingEmbeddings,
  EldenRingEmbeddingsModel,
} from '../../../../src/models/elden-ring-embeddings.model';
import connectToMongoDB from '../../../../src/page-utils/prospero/connect-to-mongodb.function';
import fixArrayPrecision from '../../../../src/utils/chatbot/fix-array-precision.function';
import weightedReciprocalRank from '../../../../src/utils/chatbot/weighted-reciprocal-rank.function';

export async function POST(req: NextRequest) {
  const { embeddings, chat } = getOpenAIApi();

  const { messages }: { messages: Array<ChatCompletionMessageParam> } =
    await req.json();

  // Assuming last message will always be a user's.
  const query = messages.at(-1);

  const queryEmbeddingsResponse = await embeddings.create({
    input: query!.content as string,
    model: 'text-embedding-3-small',
  });

  await connectToMongoDB();

  const limit = 10;

  const vectorSearchResults: Array<EldenRingEmbeddings & { score: number }> =
    await EldenRingEmbeddingsModel.aggregate([
      {
        $vectorSearch: {
          index: 'default',
          path: 'embedding',
          limit,
          numCandidates: limit * 10,
          queryVector: fixArrayPrecision(
            queryEmbeddingsResponse.data.at(0)!.embedding
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

  const searchResults: Array<EldenRingEmbeddings & { score: number }> =
    (await EldenRingEmbeddingsModel.find(
      { $text: { $search: query!.content as string } },
      { score: { $meta: 'textScore' }, embedding: 0 }
    ).sort({ score: { $meta: 'textScore' } })) as any;

  const results = weightedReciprocalRank(
    [vectorSearchResults, searchResults],
    [0.25, 0.75]
  );

  const finalMessages = messages.slice(0, -1).concat({
    content: `
        Please answer the query using only the provided texts.
        ---
        Query: ${query!.content}
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
    stream: true,
  });

  // Should return citations.
  // Should add URL to mongo. Use item name in underscore_convention
  return new Response(
    completionsResponse.toReadableStream().pipeThrough(
      new TransformStream({
        transform: async (chunk: Uint8Array, controller) => {
          const chatChunkString = new TextDecoder().decode(chunk);

          const chatChunk: ChatCompletionChunk = JSON.parse(chatChunkString);

          const chunkContent = chatChunk.choices.at(0)?.delta.content;

          if (typeof chunkContent === 'string') {
            controller.enqueue(new TextEncoder().encode(chunkContent));
          } else {
            controller.terminate();
          }
        },
      })
    )
  );
}
