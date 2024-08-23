import { ClientOptions, OpenAI } from 'openai';

export default function getOpenAIApi() {
  const configuration: ClientOptions = {};

  return new OpenAI(configuration);
}
