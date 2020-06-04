import * as React from 'react';

// modules
import { Router, Redirect } from '@reach/router';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/link-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// components
import LoginV2 from './components/loginv2';
import Game from './components/game';
import NotFound from './components/notFound';

// Style
import './App.css';

// apollo
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schemas';
import { GET_PLAYERANDGAMES_CLIENT } from './graphql/queries/client/getPlayerAndGamesClient';
import { GET_MISSIONS_SERVER } from './graphql/queries/server/getMissionsServer';
import { GET_MISSION_CLIENT } from './graphql/queries/client/getMissionClient';
import { GET_JOBS_BY_GAME_ID_SERVER } from './graphql/queries/server/getJobsByGameIdServer';
import { GET_GAME_CLIENT } from './graphql/queries/client/getGameClient';


// Graphql default state
const cache = new InMemoryCache({
  dataIdFromObject: (object): any => object.__typename + ":" + object.id,
});

// Apollo Links
console.log('http link', process.env.HTTP_SERVER_LINK)
const httpLink = new HttpLink({
  uri: process.env.HTTP_SERVER_LINK || "http://localhost:4000/"
})

const wsLink = new WebSocketLink({
  uri: process.env.WS_SERVER_LINK || "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
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
    }
    :
    {
      player: null,
      games: [],
    }
})

if (localStorage.hasOwnProperty('game')) {
  const game = JSON.parse(localStorage.getItem('game') || '{}')
  client.writeQuery({
    query: GET_GAME_CLIENT,
    data: {
      game
    }
  })
}

if (localStorage.hasOwnProperty('games')) {

  const games = JSON.parse(localStorage.getItem('games') || '[]')
  const jobs = JSON.parse(localStorage.getItem('jobs') || '[]')
  for (let i = 0; i < games.length; i++) {

    client.writeQuery({
      query: GET_JOBS_BY_GAME_ID_SERVER,
      variables: { gameId: games[i].id },
      data: {
        getJobsByGameId: jobs[0] !== null ? jobs.filter((job: any) => job.gameId === games[i].id) : null
      }
    })

  }

}

if (localStorage.hasOwnProperty('mission')) {
  client.writeQuery({
    query: GET_MISSION_CLIENT,
    data: {
      mission: JSON.parse(localStorage.getItem('mission') || '{}')
    }
  })
}

if (localStorage.hasOwnProperty('missions') && localStorage.hasOwnProperty('game')) {
  const missions = JSON.parse(localStorage.getItem('missions') || '[]')
  client.writeQuery({
    query: GET_MISSIONS_SERVER,
    variables: {
      gameId: game.id,
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
