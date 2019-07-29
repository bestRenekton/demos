

export const handleChange=(input:any)=>({
    type:'HANDLE_CHANGE',
    input:input
})

export const handleAdd = () => ({
    type: 'ADD_TODO'
})

export const handleEdit = (id:any, status:any) => ({
    type: 'TOGGLE_TODO',
    id:id,
    status,
})

export const setVisibilityFilter = (filter:any) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})