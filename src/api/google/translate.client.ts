import { TranslationServiceClient } from '@google-cloud/translate';

const googleTranslateClient = new TranslationServiceClient({
  projectId: process.env.googleCloudProjectId,
});

export default googleTranslateClient;
