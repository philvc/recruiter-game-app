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
let mission: any;
let game: any;

if (localStorage.hasOwnProperty('player')) {
  player = JSON.parse(localStorage.getItem('player') || '')
}
if (localStorage.hasOwnProperty('game')) {
  game = JSON.parse(localStorage.getItem('game') || '')
}
if (localStorage.hasOwnProperty('mission')) {
  mission = JSON.parse(localStorage.getItem('mission') || '')
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
      missions: JSON.parse(localStorage.getItem("missions") || '[]'),
      gameId: localStorage.getItem('gameId'),
      jobs: JSON.parse(localStorage.getItem("jobs") || '[]'),
      missionId: localStorage.getItem('missionId'),
      mission: localStorage.hasOwnProperty('mission') ?
        {
          id: mission.id,
          isReviewed: mission.isReviewed,
          isEvaluated: mission.isEvaluated,
          isRecruiter: mission.isRecruiter,
          type: mission.type,
          progress: mission.progress,
          status: mission.status,
          isLocked: mission.isLocked,
          gameId: mission.gameId,
          score: mission.score,
          selectedJob: mission.selectedJob,
          time: mission.time,
          __typename: 'Mission',
        }
        :
        {
          id: '',
          isReviewed: false,
          isEvaluated: false,
          isRecruiter: true,
          type: '',
          progress: 0,
          status: '',
          isLocked: '',
          gameId: '',
          score: null,
          selectedJob: '',
          time: '',
          __typename: 'Mission',
        },
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
        {
          id: '',
          title: '',
          recruiterId: '',
          applicantId: '',
          missionsAccomplished: null,
          __typename: 'Game',
        }
    }
    :
    {
      player: {
        id: '',
        email: '',
        playerName: '',
        __typename: 'Player'
      },
      games: [],
      missions: [],
      jobs: [],
      gameId: localStorage.getItem('gameId') || '',
      missionId: localStorage.getItem('missionId') || '',
      mission: {
        id: '',
        isReviewed: false,
        isEvaluated: false,
        isRecruiter: true,
        type: '',
        progress: 0,
        status: '',
        isLocked: '',
        gameId: '',
        score: null,
        selectedJob: '',
        time: '',
        __typename: 'Mission',
      },
      game: {
        id: '',
        title: '',
        recruiterId: '',
        applicantId: '',
        missionsAccomplished: null,
        __typename: 'Game',
      }
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
