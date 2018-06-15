import fetch from 'dva/fetch';
import config from './config.js'
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function timeOutFetch(input, opts) {//定义新的fetch方法，封装原有的fetch方法
  let fetchPromise = fetch(input, opts);
  let timeoutPromise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject({ IsValid: false, msg: '请求超时!' })
    }, isNaN(opts.timeOut) ? 5000 : parseInt(options.timeOut));
  });
  return Promise.race([fetchPromise, timeoutPromise])
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  if (options.headers)
    options.headers['Accept'] = 'application/json,text/plain,*/*';
  else
    options.headers = {
      'Accept': 'application/json,text/plain,*/*',
      //'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + 1
    }
  return timeOutFetch(config.serverIp + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(data => ({ data }));
}
