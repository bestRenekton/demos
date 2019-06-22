import { getUserList, getUserList2 } from '../services/example'



export default {
  namespace: 'main',
  state: {},
  subscriptions: {
    Init({ dispatch, history }) {
      history.listen((location) => {
        console.log(location)
        if (location.pathname === '/main') {
          if (location.state) {

          } else {
            dispatch({//初始化列表
              type: 'fetchInit',
              payload: {
                start: 0,
                limit: 10,
                keyWords: null,
                dir: 'DESC',
                sort: 'StartDT'
                // current: 0
              }
            });
          }
        }
      });
    },
  },

  effects: {
    *fetchInit(action, { call, put, select }) {  //首次加载
      const { type, payload } = action;
      const dataBack = yield call(getUserList, payload);
      const dataBack2 = yield call(getUserList2, payload);
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
