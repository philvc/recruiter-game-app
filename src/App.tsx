import * as React from 'react';

// packages
import { Router } from '@reach/router';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// components
import SelectPlayer from './components/selectPlayer';
import SelectGame from './components/selectGame';

// style
import './App.css';

// context
const initialPlayerContext = {
  playerId: '',
  firstName: '',
  gameId: '',
  playerType: '',
};

interface IContextProps {
  playerContext: {
    playerId: string,
    firstName: string,
    gameId: string,
    playerType: string,
  };
  playerContextDispatch: ({ type }: { type: string }) => void;
}

const PlayerContext = React.createContext({} as IContextProps)

const actions = {
  PLAYER_CHANGED: 'playerChanged',
  PLAYER_ID_CHANGED: 'playerId',
  FIRSTNAME_CHANGED: 'firstName',
  GAME_ID_CHANGED: 'gameId',
  PLAYER_TYPE_CHANGED: 'playerType',
}

function reducer(state = initialPlayerContext, action: any) {
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

// gaphqlClient
const client = new ApolloClient({
  uri: 'http://localhost:5001'
})

function App() {
  const [playerContext, playerContextDispatch] = React.useReducer(reducer, initialPlayerContext)

  const value = { playerContext, playerContextDispatch }
  return (
    <ApolloProvider client={client}>
      <PlayerContext.Provider value={value}>
        <div className="App">
          <Router>
            <SelectPlayer path='/' />
            <SelectGame path='/:playerId' />
          </Router>
        </div>
      </PlayerContext.Provider>
    </ApolloProvider>
  );
}

export default App;
