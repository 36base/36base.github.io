
// 'codename': {
//   codename: 'newCodename', // 기존 codename 과 스파인 codename 이 다를 경우
//   'skinNumber': {
//     codename: 'newCodename', // 스킨마다 codename 이 다를 경우
//     bypass: 'bypassSkinNumber', // 해당 스킨의 스파인이 따로 없고, 다른 스킨의 스파인을 사용하는 경우 (한양조)
//     atlas ? png ? skel: {
//         battle: 'newCodename', // 파일마다 codename 이 다를 경우
//         stay: 'newCodename', // 파일마다 codename 이 다를 경우
//   },
// },

export default {
  AK74U: { // 95
    codename: 'AK74u',
  },
  '88type': { // 95
    1809: {
      bypass: 0,
    },
  },
  SPP1: { // 98
    1703: {
      skel: {
        stay: 'Spp1',
      },
    },
  },
  UMP9: { // 101
    codename: 'ump9',
    2106: {
      codename: 'UMP9',
    },
  },
  Mk48: { // 121
    codename: 'MK48',
  },
  SuperSASS: { // 124
    codename: 'SuperSass',
  },
  EVO3: { // 131
    0: {
      png: { stay: 'evo3' },
      skel: { stay: 'evo3' },
    },
  },
  Saiga12: { // 160
    codename: 'SAIGA12',
  },
  PzB39: { // 180
    codename: 'PZB39',
  },
};
