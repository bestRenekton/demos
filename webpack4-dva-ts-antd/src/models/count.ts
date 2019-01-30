import { routerRedux, Router, RouteProps } from 'dva/router';

// const delay = (timeout: any) => new Promise(resolve => setTimeout(resolve, timeout));

export default {
  namespace: 'count',
  state: 0,
  reducers: {
    add(state: number) { return state + 1; },
    minus(state: number) { return state - 1; },
  },
  effects: {
    *addWithDelay(action: any, some: { call: any, put: any }) {
      // yield call(delay, 500);
      const { call, put } = some;
      yield put({ type: 'add' });
    },
    *redirect(action: any, some: { call: any, put: any }) {
      const { call, put } = some;

      yield put(routerRedux.push('/abc'));
    },
  },
}
