import * as React from 'react';

// Packages
import { Router, Redirect } from '@reach/router';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// Components
import SelectGame from './components/selectGame';

// constants
import { EMAIL } from './constants';

// Style
import './App.css';
import { IContextProps, reducer, initialPlayerContext } from './App.ctx';
import Login from './components/login';

// Context
const PlayerContext = React.createContext({} as IContextProps)

// Local storage
if (localStorage.hasOwnProperty(EMAIL)) {
  const email = localStorage.getItem(EMAIL)
  console.log('email local storage :', email)
}

// State
let defaults = {
  player: {
    id: '5e9582ecb1f1623b439af5ab',
    firstName: 'Philippe',
    lastName: 'van Caloen',
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
            {localStorage.hasOwnProperty(EMAIL) ? (
              <Redirect from='/' to={`/email`} />
            ) : (
                <Login path='/' />
              )}
            <SelectGame path='/:firstName' />
          </Router>
        </div>
      </PlayerContext.Provider>
    </ApolloProvider>
  );
}

export default App;
