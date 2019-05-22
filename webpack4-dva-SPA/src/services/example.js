import request from '../public/js/requestChoose';
import qs from 'qs';

export async function getUserList(params) { 
  return request({
    url: "User/getUserList",
    method: "post",
    data: params
  });
}

export async function getUserList2(params) {
  return request({
    url:`User/getUserList2?${qs.stringify(params)}`
  })
}

