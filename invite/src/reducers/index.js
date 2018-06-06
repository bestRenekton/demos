import { combineReducers } from 'redux'
import talk from './talk'
import visibilityFilter from './visibilityFilter'


const reducers = combineReducers({
    talk,
    visibilityFilter
})

export default reducers;