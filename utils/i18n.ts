import {I18n} from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

// Import translation files
import en from '../locales/en.json';
import tr from '../locales/tr.json';

const i18n = new I18n({
  en,
  tr,
});

// Set the locale once at the beginning of your app
i18n.locale = RNLocalize.getLocales()[0]?.languageCode || 'en';

// When a value is missing from a language it'll fall back to another language with the key present
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n; 