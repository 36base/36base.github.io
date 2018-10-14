
export const request = (method, url) => (
  new Promise((resolve) => {
    const req = new XMLHttpRequest();
    req.open(method, url, true);
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        resolve({
          url: req.responseURL,
          status: req.status,
          response: req.response,
        });
      }
    };
    req.send(null);
  })
);


// girlsfrontline.kr 서버가 htaccess 때문에 없는 경로일 경우에도 200 반환함, 따라서 필터링 필요
// (해당 리소스가 html문서 인지로 판별하기 때문에 html 요청시에는 사용 불가)
export const isRequestSuccess = ({ url, status, response }) => {
  const statusHead = parseInt(status / 100, 10);
  if (!(statusHead === 2 || statusHead === 3)) return false;

  if (url.indexOf('girlsfrontline.kr') !== -1) {
    if (response.startsWith('<!doctype html>')) return false;
  }

  return true;
};
