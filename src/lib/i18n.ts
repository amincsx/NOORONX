import { translations, Language, TranslationKey } from './translations';

export function getTranslation(lang: Language, key: TranslationKey): string {
  return translations[lang][key] || translations.fa[key] || key;
}

export function getCurrentLanguage(pathname: string): Language {
  if (pathname.startsWith('/en')) {
    return 'en';
  }
  return 'fa';
}

export function getPathWithoutLanguage(pathname: string): string {
  if (pathname.startsWith('/en/')) {
    return pathname.substring(3);
  }
  if (pathname.startsWith('/en')) {
    return '/';
  }
  return pathname;
}
