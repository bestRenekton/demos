import request from '../public/js/request';

export async function fetchInit(params: any) {
  return request("/Role/GetRoleListByRoleIds", {
    method: "post",
    body: JSON.stringify(params)
  });
}