import { CreateImageRequest } from 'openai';

import { openAIApi } from './open-ai.client';

export type CreateImageParams = Omit<CreateImageRequest, 'n'>;

export async function createImage(params: CreateImageParams): Promise<string> {
  return openAIApi
    .createImage({
      ...params,
      n: 1,
    })
    .then((response) => response.data.data[0].url);
}
