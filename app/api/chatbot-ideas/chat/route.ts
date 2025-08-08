import { NextRequest } from 'next/server';
import {
  ChatCompletionChunk,
  ChatCompletionMessageParam,
} from 'openai/resources';
import getOpenAIApi from '../../../../src/api/openai/open-ai.client';

export async function POST(req: NextRequest) {
  const { embeddings, chat } = getOpenAIApi();

  const { messages }: { messages: Array<ChatCompletionMessageParam> } =
    await req.json();

  const completionsResponse = await chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    stream: true,
  });

  return new Response(
    completionsResponse.toReadableStream().pipeThrough(
      new TransformStream({
        transform: async (chunk: Uint8Array, controller) => {
          const chatChunkString = new TextDecoder().decode(chunk);

          const chatChunk: ChatCompletionChunk = JSON.parse(chatChunkString);

          const chunkContent = chatChunk.choices.at(0)?.delta.content;

          controller.enqueue(chunkContent);
        },
      })
    )
  );
}
