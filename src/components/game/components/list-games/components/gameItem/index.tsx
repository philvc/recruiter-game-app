import * as React from 'react';

// modules
import { Link } from '@reach/router';
import { useApolloClient, useQuery } from '@apollo/client';
import { format } from 'date-fns'


// apollo
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import { GET_JOBS_BY_GAME_ID_SERVER } from '../../../../../../graphql/queries/server/getJobsByGameIdServer';

const GameItem = ({ game }: any) => {

  // client
  const client = useApolloClient();
  const { player }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })

  // query
  const { loading, error, data } = useQuery(GET_JOBS_BY_GAME_ID_SERVER, {
    variables: { gameId: game.id },
    onCompleted({ getJobsByGameId }) {
      const jobs = JSON.parse(localStorage.getItem('jobs') || '[]')
      localStorage.setItem('jobs', JSON.stringify(jobs.concat(getJobsByGameId) || getJobsByGameId))
    }
  })

  if (loading) return null
  if (error) return null

  const { recruiter, applicant, createdAt, title } = game;
  return (
    <div>
      <Link to={`${game.title.split(" ").join('')}/missions`}>
        <div className='game-link' onClick={() => {

          // update client
          client.writeQuery(
            {
              query: GET_PLAYERANDGAMES_CLIENT,
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
      <p>{`recruiter: ${recruiter.playerName || recruiter.email}`}</p>
      <p>{`job seeker: ${applicant.playerName || applicant.email}`}</p>
      <p>{`started: ${format(new Date(createdAt), 'dd/MM/yyyy')}`}</p>
    </div>
  )
}

export default GameItem;