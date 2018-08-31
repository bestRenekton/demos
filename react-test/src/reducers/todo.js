let initialStgate = {
    list: [],//{ id: 1, title: 'asdfsdaf', status: 1 }
    // input: null
}

const todos = (state = initialStgate, action) => {
    switch (action.type) {
        // case 'HANDLE_CHANGE':
        //     return { ...state, input: action.input }
        //     break;
        case 'ADD_TODO':
        debugger
            let { value } = action;
            if (value) {
                let { list } = state;
                let index = list.length + 1;
                list = list.concat({ id: index, title: value, status: 1 })
                return { ...state, list }
            } else {
                alert('不能为空')
                return state
            }
        case 'TOGGLE_TODO':
            let { id, status } = action;
            let list = JSON.parse(JSON.stringify(state.list));

            list.find(data => data.id === id).status = status;
            return { ...state, list }
        default:
            return state
    }
}

export default todos