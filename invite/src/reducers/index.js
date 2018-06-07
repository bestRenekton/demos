import { combineReducers } from 'redux'
import talk from './talk'
import app from './app'


const reducers = combineReducers({
    talk,
    app
})

export default reducers;