
export const actions = {
  urlChanged: 'url',
  applicationProofUrlChanged: 'applicationProofUrl',
  isAcceptedChanged: 'isAccepted',
};

export const reducer = (state: any, action: any) => {
  let formComplete = true
  switch (action.type) {
    case actions.urlChanged:
      if (!action.payload) {
        formComplete = false
      }
      return { ...state, url: action.payload, isComplete: formComplete }
    case actions.applicationProofUrlChanged:
      return { ...state, applicationProofUrl: action.payload };
    case actions.isAcceptedChanged:
      return { ...state, isAccepted: action.payload }
    default:
      return state
  }
}