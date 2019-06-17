import Immutable, { Map, List } from 'immutable';

export default {

  namespace: 'pageB',

  state: {
    common: 0,
    selfData: Immutable.fromJS({})
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    add(state, action) {
      let { currentRouter } = action.payload;
      let { selfData, common } = state;
      selfData = selfData.setIn([currentRouter, 'num'], selfData.getIn([currentRouter, 'num']) + 1);
      return { ...state, selfData }
    },
  },

};
