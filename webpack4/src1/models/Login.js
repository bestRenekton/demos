import { browserHistory } from 'dva/router'
import com from '../utils/com'
import { parse } from 'qs';
import { Test } from '../services/Login'

export default {
  namespace: 'login',
  state: {},
  subscriptions: {
    sb: function () {
    }
  },
  effects: {
    *LoginOn({ payload,history }, { call, put }) {  // eslint-disable-line
      com.SetCookie('token', payload.username)
      //const { data } = yield call(Test, parse(payload))
      //window.location.assign('/main');
      history.push('/main');
      //    browserHistory.push('/')
      //  yield put({ type: 'appMain/LoginChangeUser',payload });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
