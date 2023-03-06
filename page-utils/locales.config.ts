export interface LocaleConfig {
  code: string;
  displayName: string;
}

export const locales: Array<LocaleConfig> = [
  {
    code: 'en',
    displayName: 'English',
  },
  {
    code: 'fr',
    displayName: 'Française',
  },
  {
    code: 'de',
    displayName: 'Deutsch',
  },
  {
    code: 'zh',
    displayName: '中国人',
  },
  {
    code: 'ja',
    displayName: '日本',
  },
];
