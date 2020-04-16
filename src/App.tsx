import * as React from 'react';

// Packages
import { Router, Redirect } from '@reach/router';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// Components
import SelectGame from './components/selectGame';

// constants

// Style
import './App.css';
import { IContextProps, reducer, initialPlayerContext } from './App.ctx';
import Login from './components/login';

// localStorage
let player: any
if (localStorage.hasOwnProperty('player')) {

  player = localStorage.getItem('player')
  console.log('player inlocalstorage :', player)
  if (player !== null) {
    player = JSON.parse(player)
  }
}

// Context
const PlayerContext = React.createContext({} as IContextProps)

// Graphql default cache state
let defaults = player !== null ?
  {
    player: {
      ...player,
      _typename: 'player'
    }
  }
  :
  {
    player: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      _typename: 'player'
    }
  }

// GraphqlClient
const client = new ApolloClient({
  uri: 'http://localhost:5001',
  clientState: {
    defaults
  }
})

function App() {
  const [playerContext, playerContextDispatch] = React.useReducer(reducer, initialPlayerContext)
  const value = { playerContext, playerContextDispatch }
  return (
    <ApolloProvider client={client}>
      <PlayerContext.Provider value={value}>
        <div className="App">
          <Router>
            {player && player.firstName ?
              (
                <Redirect from='/' to={`/${player.firstName}`} noThrow />
              ) : (
                <Login path='/' />
              )
            }
            <SelectGame path='/:firstName' />
          </Router>
        </div>
      </PlayerContext.Provider>
    </ApolloProvider>
  );
}

export default App;
