import * as React from 'react';

// modules
import { Link } from '@reach/router';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { format } from 'date-fns'

// style
import './style.css';

// apollo
import { GET_JOBS_BY_GAME_ID_SERVER } from '../../../../../../graphql/queries/server/getJobsByGameIdServer';
import { GET_GAME_CLIENT } from '../../../../../../graphql/queries/client/getGameClient';
import { GET_MISSIONS_SERVER } from '../../../../../../graphql/queries/server/getMissionsServer';
import { GET_MISSIONS_CLIENT } from '../../../../../../graphql/queries/client/getMissionsClient';
import { GET_PLAYER_CLIENT } from '../../../../../../graphql/queries/client/getPlayerClient';
import { NEW_MISSION_SUBSCRIPTION } from '../../../../../../graphql/subscriptions/newMission';
import { NEW_JOBS_SUBSCRIPTION } from '../../../../../../graphql/subscriptions/newJobs';

const GameItem = ({ game }: any) => {

  // client
  const client = useApolloClient();
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })

  // query
  const { loading: jobsLoading, error: jobsError, data: jobsData, subscribeToMore: subscribeToMoreJobs } = useQuery(GET_JOBS_BY_GAME_ID_SERVER, {
    variables: { gameId: game.id },
    onCompleted({ getJobsByGameId }) {
      const jobs = JSON.parse(localStorage.getItem('jobs') || '[]')
      localStorage.setItem('jobs', JSON.stringify(jobs.concat(getJobsByGameId) || getJobsByGameId))
    }
  })

  // queries
  const { loading: missionsLoading, error: missionsError, data: missionsData, subscribeToMore } = useQuery(GET_MISSIONS_SERVER, {
    variables: { gameId: game.id },
    onCompleted(data) {
      const { missions } = data;
      client.writeQuery({
        query: GET_MISSIONS_CLIENT,
        variables: { gameId: game.id },
        data: {
          missions: [...missions]
        }
      })

      localStorage.setItem('missions', JSON.stringify(missions))
    }

  }
  )

  // effects
  React.useEffect(() => {
    subscribeToMore({
      document: NEW_MISSION_SUBSCRIPTION,
      variables: { gameId: game.id, playerId: player.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newMissionItems = subscriptionData.data.newMission;
        return Object.assign({}, prev, {
          missions: [...prev.missions, ...newMissionItems]
        })
      }
    })
  }, [subscribeToMore, player.id, game.id])

  React.useEffect(() => {
    subscribeToMoreJobs({
      document: NEW_JOBS_SUBSCRIPTION,
      variables: { playerId: player.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newJobsItems = subscriptionData.data.newJobs;
        return Object.assign({}, prev, {
          getJobsByGameId: [...prev.getJobsByGameId, ...newJobsItems]
        })
      }
    })
  }, [subscribeToMoreJobs, player.id])


  if (jobsLoading || missionsLoading) return null
  if (jobsError || jobsError) return null

  const { recruiter, applicant, createdAt, title } = game;
  return (
    <div className='game-item-container'>
      <Link to={`${game.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('')}/lists`}>
        <div className='game-link' onClick={() => {

          // update client
          client.writeQuery(
            {
              query: GET_GAME_CLIENT,
              data: {
                game,
              }
            })

          // update storage
          localStorage.setItem('game', JSON.stringify(game))
        }
        }>
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </div>
      </Link>
      <p>{`recruiter: ${player.id === recruiter.id ? "Me" : recruiter.playerName || recruiter.email}`}</p>
      <p>{`job seeker: ${player.id === applicant.id ? "Me" : applicant.playerName || applicant.email}`}</p>
      <p>{`started: ${format(new Date(createdAt), 'dd/MM/yyyy')}`}</p>
    </div>
  )
}

export default GameItem;