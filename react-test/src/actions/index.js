

// export const handleChange=(input)=>({
//     type:'HANDLE_CHANGE',
//     input:input
// })

export const handleAdd = (value) => ({
    type: 'ADD_TODO',
    value
})

export const handleEdit = (id, status) => ({
    type: 'TOGGLE_TODO',
    id: id,
    status
})

export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})