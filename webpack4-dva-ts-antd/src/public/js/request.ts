import * as fetch from "dva/fetch";
// import { message } from 'antd';
import * as NProgress from 'nprogress';
import "nprogress/nprogress.css";
import * as qs from 'qs'


// 状态码错误信息
interface codeMessageType {
  [key: string]: any,
}
const codeMessage: codeMessageType = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  408: '请求超时',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
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
  let fetchPromise = fetch(input, opts);
  let timeoutPromise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject({ response: { status: 408 } })
    }, opts.timeOut ? opts.timeOut : 30000);
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
export default function request(url: any, options: any = { method: 'GET' }) {
  NProgress.start();
  const baseIP = 'https://www.easy-mock.com/mock/5ba06f382ee5a7654dc13ded/api/';
  let httpUrl = baseIP + url;
  // const channelId = await localForage.getItem('tfcfChannelId');
  const channelId = 123;
  const token = 'dfdfdf';
  let body = options.body ? JSON.parse(options.body) : {};
  body = { ...body, channelId, token, }

  //post需要设置headers
  if (options.method !== 'GET' && options.method !== 'get') {
    options.headers = {
      'Accept': 'application/json,text/plain,*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      // 'Content-Type': 'application/json; charset=UTF-8',
      // 'Access-Control-Allow-Credentials': 'https://v1.hitokoto.cn/',
      // 'Authorization':"BearerBVyA1xiRWaKpKVua814DHIMnc9wvyh5p9oHc8BJVmZwuj40wGB"
    }
    options.body = qs.stringify(body);
  } else {
    httpUrl += `&${qs.stringify(body)}`;
  }
  //通用配置
  options.mode = "cors";// no-cors, cors, *same-origin
  options.credentials = "same-origin";//omit：默认，不cookie；include:同域跨域cookie；same-origin：同域cookie； 
  options.cache = "default";// *default, no-cache, reload, force-cache, only-if-cached
  // options.redirect= "follow"; // manual, *follow, error
  // options.referrer= "no-referrer"; // no-referrer, *client
  options.timeOut = 60000;

  return timeOutFetch(httpUrl, options)
    .then(checkStatus)
    .then(parseText)
    .then(parseJSON)
    .then(data => data)
    .catch((e) => {
      let error = '请求失败！';
      if (e.response) {
        if (e.response.status) {
          error = codeMessage[e.response.status]
        }
      }

      console.log(error);
      NProgress.done();
      // Toast.fail(error);
      return { data: { error } };
    });
}
