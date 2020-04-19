import * as React from 'react';

// Packages
import { Router } from '@reach/router';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-boost';


// Components
import SelectGame from './components/selectGame';
import LoginV2 from './components/loginv2';

// graphql
import { typeDefs, resolvers } from './graphql/resolvers';


// Style
import './App.css';

// Graphql default state
const cache = new InMemoryCache();

// GraphqlClient
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:5001',
  }),
  cache,
  typeDefs,
  resolvers,
  connectToDevTools: true
})

// cache.writeData({
//   data: {
//     player: {
//       __typename: 'Player'
//     },
//     games: [],
//   }
// })

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          {localStorage.hasOwnProperty('player') ?
            <SelectGame path='/' />
            :
            <LoginV2 path='/' />
          }
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
