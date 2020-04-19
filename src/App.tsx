import * as React from 'react';

// Packages
import { Router } from '@reach/router';
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

cache.writeData({
  data: {
    player: {
      id: '',
      email: '',
      firstName: 'kiki',
      lastName: '',
      __typename: 'Player'
    },
    games: [],
    isLoggedIn: !!localStorage.getItem('player'),
  }
})

console.log('hello app.tsx')

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          {/* {localStorage.hasOwnProperty('player') ?
            :
          } */}
          <LoginV2 path='/' />
          <SelectGame path='/email' />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
