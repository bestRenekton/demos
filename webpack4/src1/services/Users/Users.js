import request from '../../utils/request';
import qs from 'qs';
export async function query(params) {

	//return request(`/api/users?${qs.stringify(params)}`)
debugger
	return request(`/api/Users/Show?${qs.stringify(params)}`, {
		method: "get",
		
	})


}
export async function remove(params) {
	return request(`/api/Users/Delete`, {
		method: "post",
		
		body: JSON.stringify(params)
	})
	/*
	return request(`/api/Users/Delete?${qs.stringify(params)}`,{
		method:'get',
		
	})
	*/
}
export async function create(params) {
	return request(`/api/Users/Add`, {
		method: 'post',
		
		body: JSON.stringify(params),
	})
}
export async function update(params) {
	return request(`/api/Users/Update`, {
		method: 'post',
		
		body: JSON.stringify(params)

	})
}