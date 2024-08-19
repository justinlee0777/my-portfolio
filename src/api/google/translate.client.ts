import { TranslationServiceClient } from '@google-cloud/translate';
import getGCPCredentials from '../../utils/get-gcpc-credentials.function';

export default function getGoogleTranslateClient() {
  return new TranslationServiceClient(getGCPCredentials());
}
