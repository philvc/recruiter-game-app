export const actions = {
    stateChanged: 'stateChanged',
    urlChanged: 'url',
    nameChanged: 'name',
}

export const initialState = []

export const reducer = function (state: any, action: any) {
    console.log('action reducer :', action)
    switch (action.type) {
        case actions.stateChanged:
            return [...state, ...action.payload]

        case actions.urlChanged:
            return state.map((job: any, index: number) => {
                console.log(index === action.payload.index)
                if (index === action.payload.index) {
                    return { ...job, url: action.payload.data }
                } else {
                    return job
                }
            })

        case actions.nameChanged:
            return state.map((job: any, index: number) => {
                if (index === action.payload.index) {
                    return { ...job, name: action.payload.data }
                } else {
                    return job
                }
            })

        default:
            return state
    }
}
