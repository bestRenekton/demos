import request from '../utils/request';

export async function query() {
  return request('/api/users');
}
export async function Test(params) {
	debugger
	var queryDto = {
		PageIndex:5,
		PageSize:35
	}
	return request(`/Home/Test`, {
		method: 'post',
		
		body: JSON.stringify(params),
	})
}