import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ apiKey: process.env.openaiAPIKey });

export const openAIApi = new OpenAIApi(configuration);
