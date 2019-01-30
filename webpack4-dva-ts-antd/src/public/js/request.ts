import * as fetch from "dva/fetch";
import { message } from 'antd';
import * as NProgress from 'nprogress';
import "nprogress/nprogress.css";



function parseText(response: any) {
  return response.text();
}
function parseJSON(text: any) {
  // return response.json();
  NProgress.done();
  try {
    return JSON.parse(text);
  }
  catch (e) {
    return text;
  }
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error: any = new Error(response.statusText);
  error.response = response;
  throw error;
}


/**
 * 定义新的fetch方法，封装原有的fetch方法
 * @param input 
 * @param opts 
 */
function timeOutFetch(input: any, opts: any) {
  opts.credentials = 'include';//cookie附带：同域， include 跨域
  opts.mode = "cors";
  opts.cache = "force-cache";
  let fetchPromise = fetch(input, opts);
  let timeoutPromise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject({ response: { status: 408 }, msg: '请求超时!' })
    }, isNaN(opts.timeOut) ? 3000 : parseInt(opts.timeOut, 10));
  });
  return Promise.race([fetchPromise, timeoutPromise])//])
}



/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url: any, options: any) {
  // debugger
  NProgress.start();

  const baseIP = 'https://www.easy-mock.com/mock/5ba06f382ee5a7654dc13ded/api/';
  let httpUrl = baseIP + url;
  if (options.headers) {
    options.headers['Accept'] = 'application/json,text/plain,*/*';
    options.headers['Authorization'] = "Bearer aa/dXRXPeBijV2j6MFS+aa+aa+bxM="
  } else {
    options.headers = {
      'Accept': 'application/json,text/plain,*/*',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json;charset=UTF-8',//'application/json',
      'Authorization': "Bearer 12+12+0RN7ZXA316rPwJWAg1lYK50dlMQnFzAKDXLCf24MGb92/yE4G2ITEXcJUs"
    }
  }


  return timeOutFetch(httpUrl, options)
    .then(checkStatus)
    .then(parseText)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch((e) => {
      debugger
      let error = '未知错误！';
      if (e.response) {
        switch (e.response.status) {
          case 404:
            error = '请求地址无效！';
            break;
          case 408:
            error = '请求超时!';
            break;
          case 500:
            error = '服务器内部错误！';
            break;
          case 502:
            error = '错误网关！';
            break;
          case 503:
            error = '服务器连接失败！';
            break;
          default:
            break;
        };
      }
      NProgress.done();
      message.error(`${error}`);
      // return { data: { error } };
    });
}
