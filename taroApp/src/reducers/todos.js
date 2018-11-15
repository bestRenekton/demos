import { ADD, DELETE } from '../constants/todos'
// 定义初始状态 
const INITIAL_STATE = {
    list: [{ id: 0, text: '第一条todo' }]
}
function todos(state = INITIAL_STATE, action) {
    // 获取当前todos条数，用以id自增 
    const todoNum = state.list.length;
    switch (action.type) {
        // 根据指令处理todos
        case ADD:
            return {
                ...state,
                list: state.list.concat({ id: todoNum, text: action.data })
            }
        case DELETE:
            let newTodos = state.list.filter(item => { return item.id !== action.id })
            return {
                ...state,
                list: newTodos
            }
        default: return state
    }
}
export default todos