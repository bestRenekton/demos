import { combineReducers } from 'redux'
import todos from './todo'
import app from './app'
// import visibilityFilter from './visibilityFilter'


const reducers = combineReducers({
    app,
    todos,
    // visibilityFilter
})

export default reducers;