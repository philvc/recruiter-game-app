import * as React from 'react';

// Packages
import { Router, Redirect } from '@reach/router';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';


// Components
import LoginV2 from './components/loginv2';

// graphql
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schemas';

// Style
import './App.css';
import Game from './components/game';

// Graphql default state
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:5001',
})
// GraphqlClient
const client = new ApolloClient<NormalizedCacheObject>({
  link,
  cache,
  typeDefs,
  resolvers,
  connectToDevTools: true
})


let player: any;

if (localStorage.hasOwnProperty('player')) {
  player = JSON.parse(localStorage.getItem('player') || '')
}

cache.writeData({
  data: player ?
    {
      id: player.id,
      email: player.email,
      firstName: player.firstName,
      lastName: player.lastName,
      games: JSON.parse(localStorage.getItem('games') || ''),
    }
    :
    {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      games: [],
    }
})

function App() {
  console.log('player :', player)

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          {player === undefined ?
            (<LoginV2 path='/' />)
            :
            (<Redirect from='/' to={`/${player.firstName}/select`} noThrow />)
          }
          <Game path='/:firstName/*' />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
