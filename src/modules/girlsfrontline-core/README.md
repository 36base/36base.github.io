# README

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Build Status](https://travis-ci.org/36base/girlsfrontline-core.svg?branch=master)](https://travis-ci.org/36base/girlsfrontline-core) [![codecov](https://codecov.io/gh/36base/girlsfrontline-core/branch/master/graph/badge.svg)](https://codecov.io/gh/36base/girlsfrontline-core)

#### Supported languages: Korean\(ko-KR\), Japanese\(ja-JP\), English\(en-US\), Chinese\(zh-CN\)

[API Reference](docs.md)

## Install

### Using npm

```bash
$ npm install girlsfrontline-core
```

with [i18next](https://www.i18next.com/)

```bash
$ npm install girlsfrontline-core i18next i18next-xhr-backend
```

### Using cdn

```markup
<script crossorigin src="https://unpkg.com/girlsfrontline-core/umd/gfcore.min.js"></script>
```

## Example

```javascript
import {dolls, equips, fairies} from 'girlsfrontline-core';

const g36 = dolls.find(({codename}) => codename === 'G36');
g36.level = 70;
g36.dummyLink = 3;
g36.favor = 50;
console.log(g36.stats);
// { hp: 540,
//   pow: 39,
//   hit: 33,
//   dodge: 31,
//   speed: 10,
//   rate: 66,
//   armorPiercing: 10,
//   criticalPercent: 20 }

const equip = equips.find(({buildTime}) => buildTime === 2100);
console.log(equip.stats);
// { criticalPercent: { min: 26, max: 32 } }

const DJMAXSEHRA = fairies.find(({codename}) => codename === 'DJMAXSEHRA');
DJMAXSEHRA.skillLevel = 7;
console.log(DJMAXSEHRA.skill);
// {
//   codename: 'LadyMadeSTAR',
//   consumption: 1,
//   cooldown: 0,
//   cooldownType: 'frame',
//   description: 'battle_skill_config-290015207',
//   detail: 'battle_skill_config-390015207',
//   id: '900152',
//   initialCooldown: 30,
//   name: 'battle_skill_config-190015207',
// }
```

### Using i18next

```javascript
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

new Promise((resolve, reject) => {
  i18next.use(XHR).init({
    fallbackLng: 'ko-KR',
    lng: 'ko-KR',
    load: 'currentOnly',
    ns: ['gfcore'],
    whitelist: ['ko-KR', 'ja-JP', 'en-US', 'zh-CN'],
    backend: {
      loadPath: 'https://unpkg.com/girlsfrontline-core@2.1.5-beta9/build/i18n/{{lng}}/{{ns}}.json',
      crossDomain: true,
    },
  }, (err, t) => {
    if (err) {
      reject(err);
    }

    resolve(t);
  });
}).then((t) => {
  // or i18next.t
  console.log(t('gfcore:battle_skill_config-290015207'));
  // 다음 전투에서, 본 제대 전체의 화력을 15% 상승시키고 적군 전체의 명중을 8% 감소시킨다. 지속시간 20초
});
```

