import request from '../../utils/request';
import qs from 'qs';
import { debug } from 'util';

export async function queryEmployee(params) {
	return request(`/Employee/GetEmployeeListByRoleIdPaged?${qs.stringify(params)}`, {
		method: "post",
	})
}

export async function queryEmployeeByOrg(params) {
	return request(`/Employee/GetEmployeeListByOrganizationId?${qs.stringify(params)}`, {
		method: "post",
	})
}