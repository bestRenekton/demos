import { message } from 'antd';
import { DvaModel, Effects, Subscriptions, Action } from '../interfaces/index';
// import immutable, { Map, List } from 'immutable';
import * as immutable from 'immutable';
import { fetchInit, getUserList2 } from '../services/main'



const Model: DvaModel = {
  namespace: 'main',
  state: immutable.fromJS({
    count: 1,
    list: [],
    content: null
  }),
  subscriptions: {
    Init(Subscriptions: Subscriptions) {
      const { dispatch, history } = Subscriptions;
      history.listen((location: any) => {

      });
    },
  },

  effects: {
    *fetchInit(Action: Action, Effects: Effects) {
      const { type, payload } = Action;
      const { call, put, select } = Effects;
      const dataBack = yield call(fetchInit, { a: 1 });
      const dataBack2 = yield call(getUserList2, { a: 1 });
      yield put({ type: 'loadList', payload: { list: dataBack.data.result, content: dataBack2.data.result.content } });
    },
  },

  reducers: {
    add(state: any, action: Action) {
      let count = state.get('count');
      let newState = state.set('count', count + 1)
      return newState;
    },
    loadList(state: any, action: Action) {
      let { payload: { list, content } } = action;
      let count = state.get('count');
      let newState = state.set('list', list).set('content', content)
      return newState;
    },
  },

};
export default Model
