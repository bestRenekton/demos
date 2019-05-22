import fetchFoo from './requestFetch'
import axiosFoo from './requestAxios'


export default function request(opt) {
    if (window.fetch) {
        return fetchFoo(opt)
    } else {
        return axiosFoo(opt)
    }
}