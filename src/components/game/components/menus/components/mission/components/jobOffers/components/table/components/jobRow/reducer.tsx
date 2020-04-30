
export const actions = {
  urlChanged: 'url',
  applicationProofUrlChanged: 'applicationProofUrl'
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.urlChanged:
      return { ...state, url: action.payload }
    case actions.applicationProofUrlChanged:
      return { ...state, applicationProofUrl: action.payload }
    default:
      return state
  }
}