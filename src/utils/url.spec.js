import { getDollResourceUrl, getDollTypeIconUrl, getFairyTypeIconUrl } from './url';

describe('`getDollResourceUrl()`', () => {
  test('returns normal image url', () => {
    expect(getDollResourceUrl('IDWMod', 'normal'))
      .toBe('https://raw.githubusercontent.com/36base/girlsfrontline-resources/master/pic/pic_IDWMod.png');
  });
  test('returns damaged image url', () => {
    expect(getDollResourceUrl('IDWMod', 'damaged', { skin: 2108 }))
      .toBe('https://raw.githubusercontent.com/36base/girlsfrontline-resources/master/pic/pic_IDW_2108_D.png');
  });
  test('returns portrait image url', () => {
    expect(getDollResourceUrl('IDWMod', 'portrait', { skin: 2108 }))
      .toBe('https://raw.githubusercontent.com/36base/girlsfrontline-resources/master/pic/pic_IDW_2108_N_mod.png');
  });
  test('throws error when received unexpected type', () => {
    expect(() => getDollResourceUrl('IDWMod', 'DANYAAAAAAAAA', { skin: 2108 }))
      .toThrowError('unexpected resource type: DANYAAAAAAAAA');
  });
});

describe('`getDollTypeIconUrl()`', () => {
  test('returns typeicon url', () => {
    expect(getDollTypeIconUrl('ar', 7)).toBe('https://raw.githubusercontent.com/36base/girlsfrontline-resources/master/typeicons/gun/AR7.png');
  });
});

describe('`getFairyTypeIconUrl()`', () => {
  test('returns typeicon url', () => {
    expect(getFairyTypeIconUrl('battle')).toBe('https://raw.githubusercontent.com/36base/girlsfrontline-resources/master/typeicons/fairy/battle.png');
  });
});
