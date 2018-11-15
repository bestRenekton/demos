import { createStore, applyMiddleware } from 'redux'
// 引入需要的中间件 
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
// 引入根reducers 
import rootReducer from '../reducers/index'


const middlewares = [
    thunkMiddleware,
    createLogger()
]
// 创建 store
export default function configStore() {
    const store = createStore(rootReducer, applyMiddleware(...middlewares))
    return store
}