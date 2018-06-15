import request from '../../utils/request';
import qs from 'qs';
import { debug } from 'util';

export async function query(params) {
	return request(`/RoleCategory/Tree?${qs.stringify(params)}`, {
		method: "post",
	})
}
export async function remove(params) {
	return request(`/Role/Remove?${qs.stringify(params)}`, {
		method: "post",
		//body: qs.stringify(params)
	})
}
export async function add(params) {
	return request(`/Role/New`, {
		method: 'post',
		body: JSON.stringify(params),
	})
}
export async function update(params) {
	return request(`/Role/Modify`, {
		method: 'post',
		body: JSON.stringify(params)

	})
}

export async function queryUser(params) {
	return request(`/Role/GetAll?${qs.stringify(params)}`, {
		method: "post",
	})
}

export async function removeRoleEmployee(params) {
	return request(`/Role/DeleteRelationEmployeeRole`, {
		method: "post",
		body: JSON.stringify(params),
	})
}

export async function addRoleEmployee(params) {
	return request(`/Role/AddRelationEmployeeRole`, {
		method: 'post',
		body: JSON.stringify(params),
	})
}