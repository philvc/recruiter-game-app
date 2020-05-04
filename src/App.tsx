import * as React from 'react';

// Packages
import { Router, Redirect } from '@reach/router';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';


// Components
import LoginV2 from './components/loginv2';
import Game from './components/game';

// graphql
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schemas';
import { GET_PLAYERANDGAMES_CLIENT } from './graphql/queries/client/getPlayerAndGamesClient';

// Style
import './App.css';
import NotFound from './components/notFound';

// Graphql default state
const cache = new InMemoryCache({
  dataIdFromObject: (object): any => object.__typename + ":" + object.id,
});
const link = new HttpLink({
  uri: "http://localhost:5001"
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
client.writeQuery({
  query: GET_PLAYERANDGAMES_CLIENT,
  variables: {
    email: player ? player.email : ''
  },
  data: player ?
    {
      player: {
        id: player.id,
        email: player.email,
        playerName: player.playerName,
      },
      games: JSON.parse(localStorage.getItem('games') || '[]'),
      missions: JSON.parse(localStorage.getItem("missions") || '[]'),
      gameId: localStorage.getItem('gameId'),
      missionId: localStorage.getItem('missionId'),
      mission: JSON.parse(localStorage.getItem('mission') || '{}')
    }
    :
    {
      player: {
        id: '',
        email: '',
        playerName: '',
      },
      games: [],
      missions: [],
      gameId: localStorage.getItem('gameId') || '',
      missionId: localStorage.getItem('missionId') || '',
      mission: {},
    }
})

function App() {


  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          {player === undefined ?
            (<LoginV2 path='/' />)
            :
            (<Redirect from='/' to={`games`} noThrow />)
          }
          <Game path='/games/*' />
          <NotFound default />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
