export const actions = {
    urlChanged: 'url',
    nameChanged: 'name',
}

export const reducer = function (state: any, action: any) {
    switch (action.type) {
        case actions.urlChanged:
            return { ...state, url: action.payload }
        case actions.nameChanged:
            return { ...state, name: action.payload }
        default:
            return state
    }
}

