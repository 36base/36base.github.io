export function getResourceHost(env = process.env.NODE_ENV) {
  if (env === 'development' || env === 'test') {
    return 'https://raw.githubusercontent.com/36base/girlsfrontline-resources/master/';
  }
  return 'https://girlsfrontline.kr/data/resource';
}
