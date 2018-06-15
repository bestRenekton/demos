import request from '../../utils/request';
import qs from 'qs';
export async function query(params) {

	return request(`/Home/GetMenu`,{
		method:"get",
     })
   

}