import { ClientOptions, OpenAI } from 'openai';

const configuration: ClientOptions = { apiKey: process.env.openaiAPIKey };

const openAIApi = new OpenAI(configuration);

export default openAIApi;
