import request from '../public/js/request';
// import qs from 'qs';
import * as qs from 'qs';

export async function fetchInit(params: any) {
  return request("User/getUserList", {
    method: "post",
    body: JSON.stringify(params)
  });
}

export async function getUserList2(params: any) {
  return request(`User/getUserList2?${qs.stringify(params)}`, {
    method: "get",
    mode: 'cors',
    traditional: true,
  })

}