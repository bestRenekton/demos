import { BaseUrl } from '../../constant/constant'
import fetch from 'isomorphic-unfetch'
import qs from 'qs'



export const GetList = async (data: any) => {
    let res = await fetch(`${BaseUrl}GetList`, { method: 'POST', body: data });
    let json = await res.json();
    return json
}

export const GetDetail = async (data: any) => {
    let res = await fetch(`https://v1.hitokoto.cn?${qs.stringify(data)}`);
    let json = await res.json();
    return json
}