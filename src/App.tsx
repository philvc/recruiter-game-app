import * as React from 'react';

// Packages
import { Router, Redirect } from '@reach/router';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, } from '@apollo/client';


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
import { GET_MISSIONS_SERVER } from './graphql/queries/server/getMissionsServer';
import { GET_MISSION_CLIENT } from './graphql/queries/client/getMissionClient';

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
let game: any;

if (localStorage.hasOwnProperty('player')) {
  player = JSON.parse(localStorage.getItem('player') || '')
}
if (localStorage.hasOwnProperty('game')) {
  game = JSON.parse(localStorage.getItem('game') || '')
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
        __typename: 'Player'
      },
      games: JSON.parse(localStorage.getItem('games') || '[]'),
      gameId: localStorage.getItem('gameId'),
      game: localStorage.hasOwnProperty('game') ?
        {
          id: game.id,
          title: game.title,
          recruiterId: game.recruiterId,
          applicantId: game.applicantId,
          missionsAccomplished: game.missionsAccomplished,
          __typename: 'Game',
        }
        :
        null
    }
    :
    {
      player: null,
      games: [],
      gameId: localStorage.getItem('gameId') || '',
      game: null,
    }
})

if (localStorage.hasOwnProperty('mission')) {
  client.writeQuery({
    query: GET_MISSION_CLIENT,
    data: {
      mission: JSON.parse(localStorage.getItem('mission') || '{}')
    }
  })
}

if (localStorage.hasOwnProperty('missions') && localStorage.hasOwnProperty('gameId')) {
  const gameId = localStorage.getItem('gameId')
  const missions = JSON.parse(localStorage.getItem('missions') || '[]')
  client.writeQuery({
    query: GET_MISSIONS_SERVER,
    variables: {
      gameId,
    },
    data: {
      missions: [...missions]
    }
  })
}


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
