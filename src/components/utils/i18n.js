import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fa from '../../locales/fa.json';
import en from '../../locales/en.json';
import LanguageDetector from 'i18next-browser-languagedetector';
//import HttpApi from 'i18next-http-backend';

const isServer = typeof window === 'undefined';
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
// Dynamic Loading .use(HttpApi)
//Dynamic Loading .use(LanguageDetector)
  if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .use(!isServer ? LanguageDetector : undefined)
    .init({
      resources: {
        en: { translation: en },
        fa: { translation: fa },
      },
      lng: 'fa', // default language
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['path', 'cookie', 'localStorage', 'htmlTag', 'navigator', 'subdomain'],
        lookupFromPathIndex: 0, // /en/about → index 0 is 'en'
        caches: ['localStorage', 'cookie'],
      },
    });
}

  export default i18n;
