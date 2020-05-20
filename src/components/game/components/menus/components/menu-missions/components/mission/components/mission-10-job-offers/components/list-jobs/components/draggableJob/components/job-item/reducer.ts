export const actions = {
    isUrlComplete: 'isUrlComplete',
    isNameComplete: 'isNameComplete',
}

export const reducer = (state: any, action: any) => {
    let formComplete;
    switch (action.type) {
        case actions.isUrlComplete:
            formComplete = state.isNameComplete && action.payload ? true : false
            return { ...state, isUrlComplete: action.payload ? true : false, isJobItemComplete: formComplete };
        case actions.isNameComplete:
            formComplete = state.isUrlComplete && action.payload ? true : false
            return { ...state, isNameComplete: action.payload ? true : false, isJobItemComplete: formComplete };
        default:
            return state;
    }
}