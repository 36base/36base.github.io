import coreEn from 'girlsfrontline-core/build/i18n/en-US/gfcore.json';
import coreKo from 'girlsfrontline-core/build/i18n/ko-KR/gfcore.json';
import coreJa from 'girlsfrontline-core/build/i18n/ja-JP/gfcore.json';
import coreZh from 'girlsfrontline-core/build/i18n/zh-CN/gfcore.json';
import extradataEn from 'girlsfrontline-extra-data/build/i18n/en-US.json';
import extradataKo from 'girlsfrontline-extra-data/build/i18n/ko-KR.json';
import extradataJa from 'girlsfrontline-extra-data/build/i18n/ja-JP.json';
import extradataZh from 'girlsfrontline-extra-data/build/i18n/zh-CN.json';
import en from './en-US/36base.json';
import ko from './ko-KR/36base.json';
import ja from './ja-JP/36base.json';
import zh from './zh-CN/36base.json';

const locale = {
  en: { translation: { ...en, ...coreEn, ...extradataEn } },
  ko: { translation: { ...ko, ...coreKo, ...extradataKo } },
  ja: { translation: { ...ja, ...coreJa, ...extradataJa } },
  zh: { translation: { ...zh, ...coreZh, ...extradataZh } },
};
export default locale;
