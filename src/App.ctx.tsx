export const initialPlayerContext = {
  playerId: '',
  firstName: '',
  gameId: '',
  playerType: '',
};

export interface IContextProps {
  playerContext: {
    playerId: string,
    firstName: string,
    gameId: string,
    playerType: string,
  };
  playerContextDispatch: ({ type }: { type: string }) => void;
}

export const actions = {
  PLAYER_CHANGED: 'playerChanged',
  PLAYER_ID_CHANGED: 'playerId',
  FIRSTNAME_CHANGED: 'firstName',
  GAME_ID_CHANGED: 'gameId',
  PLAYER_TYPE_CHANGED: 'playerType',
}

export function reducer(state = initialPlayerContext, action: any) {
  switch (action.type) {
    case actions.PLAYER_CHANGED:
      return { ...state, ...action.payload }
    case actions.PLAYER_ID_CHANGED:
      return { ...state, playerId: action.payload };
    case actions.FIRSTNAME_CHANGED:
      return { ...state, firstName: action.payload };
    case actions.GAME_ID_CHANGED:
      return { ...state, gameId: action.payload };
    case actions.PLAYER_TYPE_CHANGED:
      return { ...state, playerType: action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}