import { fairy, skills } from 'girlsfrontline-core';

const domain = 'https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/images';


// TODO:need to make buildImage function (이미지 가져오는 함수 만들기)(18-03-26)
// argument mod is fairy's modification by rarity (1 : default , 2 : rarity 3 , 3 : rarity 5)
// mod 인수는 인형의 강화단계에 따라 3단계로 나누어집니다 (1 : 기본단계, 2: 3단계 강화부터, 3:최종강화)

function buildImage(name) {
  const fname = `${name}_1_2_res`;
  return `${domain}/fairy/${fname}.png`;
}

const skillMap = new Map(skills.map(e => [e.id, e]));

function buildSkill(skill) {
  const base = skillMap.get(skill.id);

  // TODO::path 추가 필요 (04-05)
  return {
    id: skill.id,
    name: base.name,
    desc: base.desc,
    data: base.data,
    dataPool: skill.dataPool,
  };
}

// TODO:add build code : skill, stats (18-03-26)
// TODO:change variation Fairy upcase name problem (gf-core레포의 fairy를 fairies로 바꾸던가 해야할듯)(18-03-26)
// TODO:change portrait value to url NOT NULL (null로 되어있는 portrait의 값을 url기반의 값으로 변경)(18-03-26)

const fairyList = fairy.map((Fairy) => {
  return {
    id: Fairy.id,
    name: Fairy.name,
    krName: Fairy.krName,
    category: Fairy.category,
    skill: buildSkill(Fairy.skill),
    grow: Fairy.grow,
    buildTime: Fairy.buildTime,
    images: buildImage(Fairy.name),
    portrait: null,
  };
});

export default fairyList;
