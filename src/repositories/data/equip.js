
import dollList from './doll';

const domain = 'https://github.com/36base/girlsfrontline-resources/blob/master/images/equip';

const equipUtil = {
  StatDict: {
    armor: '장갑',
    dodge: '회피',
    hit: '명중',
    pow: '화력',
    range: '사거리',
    rate: '사속',
    crit: '치명타율',
    critDmg: '치명피해',
    armorPiercing: '관통',
    nightView: '야시능력',
    coolDown: '쿨타임 감소',
    bullet: '장탄수',
    speed: '이동속도',
  },
  getRankColor: (rank) => {
    let color;

    switch (rank) {
      case 2: color = '#ccc'; break;
      case 3: color = '#6bdfce'; break;
      case 4: color = '#d6e35a'; break;
      case 5: color = '#ffcd4a'; break;
      default: color = '#ffcd4a'; break;
    }

    return color;
  },
  getSpriteUrl: (data) => {
    let spriteName;
    if (data.fitGuns) {
      dollList.forEach((doll) => {
        if (data.fitGuns[0] === doll.id) {
          let dollName = doll.name.toLowerCase();

          if (dollName.search('ump') !== -1) { dollName = 'ump'; }
          if (dollName.search('ak') !== -1) { dollName = 'ak'; }

          spriteName = `${data.type}_${dollName}`;
        }
      });
    } else {
      switch (data.type) {
        case 'suit': {
          let spriteNum;

          switch (data.rank) {
            case 5: spriteNum = 3; break;
            case 4: spriteNum = 2; break;
            default: spriteNum = 1; break;
          }
          spriteName = `${data.type}_${spriteNum.toString()}`;
        } break;
        case 'sgBullet': {
          let detail = 'b';
          if (data.name.search('슬러그') !== -1) { detail = 's'; }

          spriteName = `${data.type}_${detail}`;
        } break;
        case 'skeleton': {
          let detail = 'x';

          if (data.name.search('T') !== -1) { detail = 't'; }

          spriteName = `${data.type}_${detail}`; 
        } break;

        default: spriteName = data.type; break;
      }

      if (data.name.search('16Lab') !== -1) {
        spriteName = `${spriteName}_lab`;
      }
    }
    return `${domain}/${spriteName}.png?raw=true`;
  },
  intTime2Str: (time) => {
    const hour = Number.parseInt(time / 3600, 10);
    const min = Number.parseInt((time - (hour * 3600)) / 60, 10);
    const sec = Number.parseInt(time % 60, 10);

    return `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  },
};

export default equipUtil;
