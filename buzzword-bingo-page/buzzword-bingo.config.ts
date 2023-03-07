export interface BuzzwordBingoConfig {
  textContent: {
    header: string;
    explanation: Array<string>;
  };
}

function getBuzzwordBingoTranslationKeys(
  config: BuzzwordBingoConfig
): Array<string> {
  return config.textContent.explanation.map(
    (_, i) => `textContent.explanation.${i}`
  );
}

const keysToTranslate = ['header'].map((key) => `textContent.${key}`);

export function getTranslationKeys(config: BuzzwordBingoConfig): Array<string> {
  return [...keysToTranslate, ...getBuzzwordBingoTranslationKeys(config)];
}
