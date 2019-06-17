import React from 'react';
import { getUserList, getUserList2 } from '../services/example'
import { notification, message } from 'antd';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import app from '../index'


//路由表
const routerList = [
  {
    namespace: 'pageA',
    exact: true,
    url: '/',
    models: [
      import('../models/PageA'),
    ],
    component: import('../routes/PageA'),
  },
  {
    namespace: 'pageA',
    // exact: true,
    url: '/a',
    models: [
      import('../models/PageA'),
    ],
    component: import('../routes/PageA'),
  },
  {
    namespace: 'pageB',
    url: '/b',
    models: [
      import('../models/PageB'),
    ],
    component: import('../routes/PageB'),
  },
  {
    namespace: 'page404',
    url: '/404',
    models: [
      // import('../models/PageB'),
    ],
    component: import('../routes/Page404'),
  },
];
//路由生成器
const DvaRouterList = routerList.map((e, i) => {
  const component = dynamic({
    app,
    namespace: e.namespace,
    models: () => e.models,
    component: () => e.component,
  });
  return (
    <Route
      path={e.url}
      component={component}
      key={e.url}
      {...e.exact ? { exact: true } : {}}
    />
  )
})


export default {
  namespace: 'main',
  state: {
    DvaRouterList,
    aside: [
      { name: 'add A', url: '/a' },
      { name: 'add B', url: '/b' },
    ],
    routers: [

    ],
    currentRouter: null,
  },
  subscriptions: {
    Init({ dispatch, history }) {
      history.listen((location) => {
        // console.log(location)
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
    addRouter(state, action) {
      let { DvaRouterList, routers, currentRouter } = state;
      let { name, url } = action.payload;
      let key = routers.length;
      let newRouter = {
        title: name,
        Com: DvaRouterList.filter(e => e.key === url)[0],
        url,
        key
      };
      routers = [...routers, newRouter];
      currentRouter = key;
      return { ...state, routers, currentRouter }
    },
    switchRouter(state, action) {
      return { ...state, currentRouter: action.payload }
    }
  },

};
