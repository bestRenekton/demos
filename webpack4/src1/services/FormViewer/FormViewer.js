import request from '../../utils/request';
import qs from 'qs';
export async function save(params, act) {

    /*return request(`/FormCategory/New`, {
        method: 'post',
        //mode: 'cors',
        traditional: true,
        body: JSON.stringify({
            Id:'6EBBCF53-EC99-4380-B237-994D73E4F596',
            Code:'12345',
            Name:'测试',
            Status:1,
            SortIndex:1,
            OperationStatus:1,
            UserId:'6EBBCF53-EC99-4380-B237-994D73E4F591',
            CompanyId:'6EBBCF53-EC99-4380-B237-994D73E4F592',
            UserName:'TestUser'
        }),
        headers: {
            //'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded'
        }
    })*/
    return request(`/FormTemplate/` + act, {
        method: 'post',
        //mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
        headers: {
            //'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
export async function detail(params) {
    return request(`/FormTemplate/GetForModify?${qs.stringify(params)}`, {//formTemplateId=0514f22b-b779-eb25-694f-3d8a4ed83fc3&companyId=6EBBCF53-EC99-4380-B237-994D73E4F592`, {
        method: 'get',
        //mode: 'cors',
        traditional: true,
        //body: JSON.stringify(params),
        headers: {
            //'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}