import i18next from 'i18next';
// import XHR from 'i18next-xhr-backend';
import LngDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
import locale from './locale';

// i18next.use(XHR).use(reactI18nextModule).init({
i18next.use(LngDetector).use(reactI18nextModule).init({
  fallbackLng: 'en',
  // load: 'currentOnly',
  // whitelist: ['ko', 'ja', 'en', 'zh'],
  resources: locale,
  // backend: {
  //   loadPath: 'https://unpkg.com/girlsfrontline-core@latest/build/i18n/{{lng}}/{{ns}}.json',
  //   crossDomain: true,
  // },
  react: {
    wait: false,
  },
});

export default i18next;
