import * as React from 'react';

// Packages
import { Router, Redirect } from '@reach/router';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';


// Components
import SelectGame from './components/selectGame';
import LoginV2 from './components/loginv2';

// graphql
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schemas';

// Style
import './App.css';

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
  cache.writeData({
    data: {
      id: player.id,
      email: player.email,
      firstName: player.firstName,
      lastName: player.lastName,
      games: JSON.parse(localStorage.getItem('games') || ''),
      isLoggedIn: !!localStorage.getItem('player'),
    }
  })
} else {
  cache.writeData({
    data: {
      id: '',
      email: '',
      firstName: 'kiki',
      lastName: '',
      games: [],
      isLoggedIn: !!localStorage.getItem('player'),
    }
  })
}

console.log('hello app.tsx')

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          {localStorage.hasOwnProperty('player') ?
            (<Redirect from='/' to='/selectGame' noThrow />)
            :
            (<LoginV2 path='/' />)
          }
          <SelectGame path='/selectGame' />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
