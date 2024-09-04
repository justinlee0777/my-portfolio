import CreateImageParams from './create-image-params.type';
import getOpenAIApi from './open-ai.client';

export default async function createImage(
  params: CreateImageParams
): Promise<string> {
  const openAIApi = getOpenAIApi();

  return openAIApi.images
    .generate({
      ...params,
      n: 1,
    })
    .then((response) => response.data[0].url as string);
}
