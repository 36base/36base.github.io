function renderTemplate(templateStr, data) {
  const replaceFunc = function(data, str, dataStr) {
    let result = str;
    for (const key in data) {

      let fullKey = dataStr + "." + key;
      if (dataStr == "") { fullKey = key; }

      if (typeof(data[key]) === 'object') {
        result = replaceFunc(data[key], result, dataStr + key);
      }

      while (true) {
        const temp = result;
        result = result.replace('{' + fullKey + '}', data[key]);
        if (temp === result) break;
      }
    }
    return result;
  }
  return replaceFunc(data, templateStr, "");
}
