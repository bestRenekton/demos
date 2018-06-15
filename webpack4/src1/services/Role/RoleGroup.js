import request from '../../utils/request';
import qs from 'qs';
import { debug } from 'util';

export async function addGroup(params) {
	return request(`/RoleCategory/New`, {
		method: 'post',
		body: JSON.stringify(params),
	})
}

export async function queryTree(params) {
	return request(`/RoleCategory/Tree?${qs.stringify(params)}`, {
		method: "post",
	})
}

export async function queryGroup(params) {
	return request(`/RoleCategory/GetAll?${qs.stringify(params)}`, {
		method: "post",
	})
}

export async function updateGroup(params) {
	return request(`/RoleCategory/Modify`, {
		method: 'post',
		body: JSON.stringify(params)
	})
}

export async function removeGroup(params) {
	return request(`/RoleCategory/Remove?${qs.stringify(params)}`, {
		method: "post",
		//body: qs.stringify(params)
	})
}

