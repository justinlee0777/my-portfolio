import CreateImageParams from './create-image-params.type';
import openAIApi from './open-ai.client';

export default async function createImage(
  params: CreateImageParams
): Promise<string> {
  return openAIApi.images
    .generate({
      ...params,
      n: 1,
    })
    .then((response) => response.data[0].url);
}
