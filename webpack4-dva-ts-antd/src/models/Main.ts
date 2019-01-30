import { message } from 'antd';
import { DvaModel, Effects, Subscriptions, Action } from '../interfaces/index';
import { fetchInit } from '../services/main'
// import immutable, { Map, List } from 'immutable';
import * as immutable from 'immutable';



const Model: DvaModel = {
  namespace: 'main',
  state: immutable.fromJS({
    count: 1,
    list: [1, 2]
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
      debugger
      const { type, payload } = Action;
      const { call, put, select } = Effects;
      const data = yield call(fetchInit, { a: 1 });
      yield put({ type: 'add', payload: { num: 3 } });
    },
    // *fetch({ payload }, { call, put, select }) {  // eslint-disable-line
    //   yield put({ type: 'save' });
    // },
  },

  reducers: {
    // save(state, action) {
    //   return { ...state, ...action.payload };
    // },
    add(state: any, action: Action) {
      debugger
      // const { state, action } = Reducers;
      // let newS = JSON.parse(JSON.stringify(state));
      // let { count } = newS;
      // let { payload: { num } } = action;
      // newS.count = count + 1;
      let count = state.get('count');
      let newState = state.set('count', count + 1)
      return newState;
    },
  },

};
export default Model
