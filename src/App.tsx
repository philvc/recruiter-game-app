import * as React from 'react';

// modules
import { Router, Redirect } from '@reach/router';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, } from '@apollo/client';


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
      game: localStorage.hasOwnProperty('game') ?
        {
          id: game.id,
          title: game.title,
          recruiterId: game.recruiterId,
          applicant: game.applicant,
          recruiter: game.recruiter,
          applicantId: game.applicantId,
          missionsAccomplished: game.missionsAccomplished,
          createdAt: game.createdAt,
          __typename: 'Game',
        }
        :
        null
    }
    :
    {
      player: null,
      games: [],
      game: null,
    }
})

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
