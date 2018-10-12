
const request = (method, url) => (
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

export default request;
