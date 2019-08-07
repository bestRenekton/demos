let initialStgate = {
    title: 'ti',
}

const app = (state = initialStgate, action: any) => {
    switch (action.type) {
        case 'TITLE_CHANGE':
            return { ...state, title: action.payload.title }
            break;
        default:
            return state
    }
}

export default app