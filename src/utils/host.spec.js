import { getResourceHost } from './host';

describe('`getResourceHost()`', () => {
  test('returns rawgit host', () => {
    expect(getResourceHost()).toBe('https://raw.githubusercontent.com/36base/girlsfrontline-resources/master/');
  });
  test('returns rawgit host when NODE_ENV is "development"', () => {
    expect(getResourceHost('development')).toBe('https://raw.githubusercontent.com/36base/girlsfrontline-resources/master/');
  });
  test('returns hotlink host when NODE_ENV is "production"', () => {
    expect(getResourceHost('production')).toBe('https://girlsfrontline.kr/data/resource/');
  });
});
