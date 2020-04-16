import * as React from 'react';

// Packages
import { Router, Redirect } from '@reach/router';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// Components
import SelectGame from './components/selectGame';
import Login from './components/login';

// constants

// Style
import './App.css';

// Context
import { reducer, PlayerContext } from './App.ctx';

// Player definition
let player: any
if (localStorage.hasOwnProperty('player')) {

  player = localStorage.getItem('player')
  if (player !== null) {
    player = JSON.parse(player)
    player._typename = 'player'
  }
} else {
  player = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    gameId: '',
    playerType: '',
    _typename: 'player'
  }
}

// Graphql default cache state
let defaults = {
  player,
}

// GraphqlClient
const client = new ApolloClient({
  uri: 'http://localhost:5001',
  clientState: {
    defaults
  }
})

function App() {
  const [playerContext, playerContextDispatch] = React.useReducer(reducer, player)
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
