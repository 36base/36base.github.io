import { equips } from 'girlsfrontline-core';

import DollRepository from './DollRepository';

const domain = 'https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/images/equip';

const buildSpriteUrl = info => (
  `${domain}/${info.category}_${info.type}${info.option ? `_${info.option}` : ''}${info.special ? `_${info.special}` : ''}${info.company === '16Lab' ? '_lab' : ''}.png`
);

const getSprite = async (data) => {
  const resourceName = {
    category: data.category,
    type: data.type,
    option: '',
    special: '',
  };
  switch (data.type) {
    case 'optical': resourceName.type = 'scope'; break;
    case 'suppressor': resourceName.type = 'silencer'; break;
    case 'apAmmo': resourceName.type = 'apBullet'; break;
    case 'hpAmmo': resourceName.type = 'hpBullet'; break;
    case 'hvAmmo': resourceName.type = 'hvBullet'; break;
    case 'armorPlate': resourceName.type = 'armor'; break;
    case 'ammunitionBox': resourceName.type = 'ammoBox'; break;
    case 'spPart': resourceName.type = 'special'; break;
    case 'medal': resourceName.type = 'special'; break;
    case 'exoSkeleton': {
      resourceName.type = 'skeleton';

      // 갓골 똥골 구분
      resourceName.option = (data.codename.indexOf('X') !== -1) ? 'x' : '';
      break;
    }
    case 'shotgunShell': {
      resourceName.type = 'sgBullet';

      // 슬러그탄과 벅샷 구분
      resourceName.option = (data.codename.indexOf('独头弹') !== -1) ? 's' : 'b';
      break;
    }
    case 'cloak': {
      resourceName.type = 'suit';

      // 슈트 구분 (랭크별로 달라짐)
      if (data.rank === 5) {
        resourceName.option = 3;
      } else if (data.rank === 4) {
        resourceName.option = 2;
      } else {
        resourceName.option = 1;
      }
      break;
    }
    default: break;
  }

  return new Promise((resolve) => {
    if (data.fitGuns) {
      DollRepository.fetchById((data.fitGuns[0] % 20000))
        .then((doll) => {
          resourceName.special = (doll && doll.codename) ? String(doll.codename).toLowerCase() : '';

          if (resourceName.special.indexOf('ump') !== -1) resourceName.special = 'ump';
          else if (resourceName.special.indexOf('ak') !== -1) resourceName.special = 'ak';

          if (resourceName.type === 'suit') resourceName.option = '';

          if (resourceName.special === 'clear' || resourceName.special === 'fail') resourceName.type = 'special';

          resolve(buildSpriteUrl(resourceName));
        });
    } else {
      resolve(buildSpriteUrl(resourceName));
    }
  });
};

const getColor = (rank) => {
  let color;
  switch (rank) {
    case 2: color = '#ccc'; break;
    case 3: color = '#6bdfce'; break;
    case 4: color = '#d6e35a'; break;
    case 5: color = '#ffcd4a'; break;
    default: color = '#ffcd4a'; break;
  }

  return color;
};

const equipList = [];

Promise.all(equips.map(equip => new Promise((resolve) => {
  getSprite(equip)
    .then((sprite) => {
      resolve(Object.assign(
        equip,
        {
          buildTime: ((equip.fitGuns || equip.company === '16Lab') ? 0 : equip.buildTime),
          sprite,
          color: getColor(equip.rank),
        },
      ));
    });
}))).then((list) => {
  list.forEach(iter => equipList.push(iter));
});

async function fetchAll() {
  return equipList;
}

export default { fetchAll };
