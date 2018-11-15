import { combineReducers } from 'redux'
import todos from './todos'

const reducers = combineReducers({
    todos,
})

export default reducers;