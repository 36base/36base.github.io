import coreEn from 'girlsfrontline-core/build/i18n/en-US/gfcore.json';
import coreKo from 'girlsfrontline-core/build/i18n/ko-KR/gfcore.json';
import coreJa from 'girlsfrontline-core/build/i18n/ja-JP/gfcore.json';
import coreZh from 'girlsfrontline-core/build/i18n/zh-CN/gfcore.json';
import en from './en-US/36base.json';
import ko from './ko-KR/36base.json';
import ja from './ja-JP/36base.json';
import zh from './zh-CN/36base.json';

const locale = {
  en: { translation: { ...en, ...coreEn } },
  ko: { translation: { ...ko, ...coreKo } },
  ja: { translation: { ...ja, ...coreJa } },
  zh: { translation: { ...zh, ...coreZh } },
};
export default locale;
