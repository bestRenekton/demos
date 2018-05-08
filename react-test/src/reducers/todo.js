let initialStgate = {
    list: [],//{ id: 1, title: 'asdfsdaf', status: 1 }
    input: null
}

const todos = (state = initialStgate, action) => {
    switch (action.type) {
        case 'HANDLE_CHANGE':
            return { ...state, input: action.input }
            break;
        case 'ADD_TODO':
            if(state.input){
                let {list,input}=state;
                let index=list.length+1;
                list.push({ id: index, title: input, status: 1 })
                return { ...state,list} 
                // return {list,input} 
                // return {list} 
            }else{
                alert('不能为空')
                return state
            }
            break;
        case 'TOGGLE_TODO':
            return state.map((todo) => {
                if (todo.id == action.id) {
                    return { ...todo, completed: !todo.completed }
                } else {
                    return todo
                }
            })
        default:
            return state
    }
}

export default todos