import { TranslationServiceClient } from '@google-cloud/translate';

export const googleTranslateClient = new TranslationServiceClient({
  projectId: process.env.googleCloudProjectId,
});
