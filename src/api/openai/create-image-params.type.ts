import { ImageGenerateParams } from 'openai/resources/images';

type CreateImageParams = Omit<ImageGenerateParams, 'n'>;

export default CreateImageParams;
