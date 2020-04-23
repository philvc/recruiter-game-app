import update from 'immutability-helper'

export const actions = {
    stateChanged: 'stateChanged',
    urlChanged: 'url',
    nameChanged: 'name',
    jobDragged: 'jobDragged',
}

export const initialState = []

export const reducer = function (state: any, action: any) {
    switch (action.type) {
        case actions.stateChanged:
            return [...state, ...action.payload]

        case actions.urlChanged:
            return state.map((job: any, index: number) => {
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

        case actions.jobDragged:
            const { dragIndex, hoverIndex, dragJob } = action.payload;
            const newState = update(state, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragJob],
                ],
            })
            return newState

        default:
            return state
    }
}
