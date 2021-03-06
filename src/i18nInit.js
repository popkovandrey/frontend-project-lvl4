import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { format as formatDF, parseISO, isValid } from 'date-fns';
import en from '../locales/en/translation.json';
import ru from '../locales/ru/translation.json';

export default async () => {
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false,
        format: (value, format) => {
          if (isValid(parseISO(value))) {
            return formatDF(parseISO(value), format);
          }
          return value;
        },
      },
      resources: {
        en: { translation: en },
        ru: { translation: ru },
      },
    });
};
