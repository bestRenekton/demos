import request from '../../utils/request';
import qs from 'qs';
import { debug } from 'util';

export async function getOrganizationLower(params) {
	return request(`/Organization/GetOrganizationLower?${qs.stringify(params)}`, {
		method: "post",
	})
}