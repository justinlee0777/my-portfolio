import { TranslationServiceClient } from '@google-cloud/translate';
import { ExternalAccountClient } from 'google-auth-library';

export default function getGoogleTranslateClient() {
  const {
    GCP_PROJECT_ID,
    GCP_PROJECT_NUMBER,
    GPC_WORKLOAD_IDENTITY_POOL_ID,
    GPC_WORKLOAD_IDENTITY_POOL_PROVIDER_ID,
    GCP_SERVICE_ACCOUNT_EMAIL,
    VERCEL_OIDC_TOKEN
  } = process.env;

  const authClient = ExternalAccountClient.fromJSON({
    type: 'external_account',
    audience: `//iam.googleapis.com/projects/${GCP_PROJECT_NUMBER}/locations/global/workloadIdentityPools/${GPC_WORKLOAD_IDENTITY_POOL_ID}/providers/${GPC_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
    subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
    token_url: 'https://sts.googleapis.com/v1/token',
    service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,
    subject_token_supplier: {
      // Use the Vercel OIDC token as the subject token
      getSubjectToken: async () => VERCEL_OIDC_TOKEN,
    },
  });

  return new TranslationServiceClient({
    authClient,
    projectId: GCP_PROJECT_ID,
  });
}
