import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en/trans.json';
import thTranslation from '../locales/th/trans.json';

const resources = {
	en: { translation: enTranslation },
	th: { translation: thTranslation },
};

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		load: 'languageOnly',
		resources,
		fallbackLng: 'en', // Fallback language if translation not found

		interpolation: {
			escapeValue: false, // React already escapes strings
		},
	});

export default i18n;
