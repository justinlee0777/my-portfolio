import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ apiKey: process.env.openaiAPIKey });

const openAIApi = new OpenAIApi(configuration);

export default openAIApi;
