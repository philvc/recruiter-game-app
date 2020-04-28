
export const actions = {
  urlChanged: 'url'
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.urlChanged:
      return { ...state, url: action.payload }
    default:
      return state
  }
}