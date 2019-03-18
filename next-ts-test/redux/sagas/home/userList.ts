import { take, put, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { fetchUserListDataFali, fetchUserListDataSuccess } from '../../actions/home';
import { GetList } from '../../server/home'


export function* userList(params) {
  try {
    // console.log('saga--userList', params)
    const json = yield GetList(params.payload);
    const { status, result, total } = json;

    if (status == "success") {
      yield put(fetchUserListDataSuccess(result, total))
    } else {
      yield put(fetchUserListDataFali())
    }
  } catch (error) {
    yield put(fetchUserListDataFali());
  }
}

export default [
  takeLatest('FETCH_USER_LIST', userList)
];





