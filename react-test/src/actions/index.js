let countIndex = 0;

export const handleChange=(val)=>({
    type:'HANDLE_CHANGE',
    input:val
})

export const handleAdd = () => ({
    type: 'ADD_TODO'
})

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
})

export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})