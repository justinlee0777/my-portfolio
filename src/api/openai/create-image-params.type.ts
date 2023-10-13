import { CreateImageRequest } from 'openai';

type CreateImageParams = Omit<CreateImageRequest, 'n'>;

export default CreateImageParams;
