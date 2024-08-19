import { ClientOptions, OpenAI } from 'openai';

const configuration: ClientOptions = {};

const openAIApi = new OpenAI(configuration);

export default openAIApi;
