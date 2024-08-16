import getGoogleTranslateClient from './translate.client';

/**
 * @returns the strings translated preserved in the order they were sent (as I trust Google to preserve ordinality).
 */
export default async function translate(
  strings: Array<string>,
  targetLang: string,
  sourceLang = 'en'
): Promise<Array<string>> {
  const googleTranslateClient = getGoogleTranslateClient();

  const projectId = await googleTranslateClient.getProjectId();

  const response = await googleTranslateClient.translateText({
    contents: strings,
    targetLanguageCode: targetLang,
    sourceLanguageCode: sourceLang,
    parent: `projects/${projectId}/locations/global`,
  });

  return response[0].translations.map(
    (translation) => translation.translatedText
  );
}
