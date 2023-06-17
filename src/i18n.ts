import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { initReactI18next } from 'react-i18next';
import translationEnglish from './Translation/English/translation.json';
import translationPolish from './Translation/Polish/translation.json';

const resources = {
  en: {
    translation: translationEnglish,
  },
  pl: {
    translation: translationPolish,
  },
};

const options = {
  // order and from where user language should be detected
  order: [
    'querystring',
    'cookie',
    'localStorage',
    'sessionStorage',
    'navigator',
    'htmlTag',
    'path',
    'subdomain',
  ],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pl'],
  });

export default i18next;
