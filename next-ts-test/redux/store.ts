import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import rootReducer from './reducers/index';
// import rootSaga from './sagas/saga';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    // 开发模式打印redux信息
    middleware.push(logger);
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  );
  // saga是系统的常驻进程
  // store.runSagaTask = () => {
  //   store.sagaTask = sagaMiddleware.run(rootSaga);
  // };

  // store.runSagaTask();
  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store;
}

export default configureStore;
