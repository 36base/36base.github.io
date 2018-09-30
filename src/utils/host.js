export function getResourceHost(env = process.env.NODE_ENV) {
  if (env === 'development' || env === 'test') {
    // TODO: 나중에 branch를 master로 바꿔야함
    return 'https://raw.githubusercontent.com/36base/girlsfrontline-resources/next/';
  }
  return 'https://raw.githubusercontent.com/36base/girlsfrontline-resources/next/';
  // return 'https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/';
}
