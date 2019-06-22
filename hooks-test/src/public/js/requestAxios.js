import axios from 'axios'
// import { message } from 'antd';
import qs from 'qs'


// 状态码错误信息
const codeMessage = {
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


// 添加一个请求拦截器
axios.interceptors.request.use((config) => {
  // NProgress.start();
  const baseIP = 'https://www.easy-mock.com/mock/5ba06f382ee5a7654dc13ded/api/';
  let { method, data } = config;
  // const channelId = await localForage.getItem('tfcfChannelId');
  const channelId = 123;
  const token = 'dfdfdf';
  const commonObj = { channelId, token };
  //post需要设置headers
  if (method !== 'GET' && method !== 'get') {
    config.data = data ? { ...data, ...commonObj } : {};
  } else {
    config.url += `&${qs.stringify(commonObj)}`;
  }
  //通用配置
  // opt.mode = "cors";// no-cors, cors, *same-origin
  // opt.credentials = "same-origin";//omit：默认，不cookie；include:同域跨域cookie；same-origin：同域cookie； 
  // opt.cache = "default";// *default, no-cache, reload, force-cache, only-if-cached
  // // opt.redirect= "follow"; // manual, *follow, error
  // // opt.referrer= "no-referrer"; // no-referrer, *client
  config.timeout = 60000;
  config.withCredentials = true;
  config.url = baseIP + config.url;
  return config;
}, (error) => {
  console.log(error)
  return Promise.reject(error);
});
// 添加一个返回拦截器
axios.interceptors.response.use((response) => {
  // NProgress.done();
  return response;
}, (error) => {
  // NProgress.done();
  return Promise.reject(error);
});


export default function request(opt) {
  return axios(opt)
    .then((response) => {
      console.log(`【${opt.method ? opt.method : 'get'}: ${opt.url}】请求成功，响应数据：%o`, response);
      if (response.data && !response.data.isValid) {
        // message.error(response.data.errorMessages);
      }
      return { ...response.data };
    })
    .catch((error) => {
      console.log(`【${opt.method ? opt.method : 'get'}: ${opt.url}】请求失败，响应数据：%o`, error.response || error.message);
      // 响应时状态码处理 
      const status = error.response ? error.response.status : 500;
      const errortext = codeMessage[status] || error.response.statusText || error.message;
      return { code: status, message: errortext };
    })
}
