import * as React from 'react';

// modules
import { Link } from '@reach/router';
import { useApolloClient, useQuery } from '@apollo/client';

// apollo
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import { GET_JOBS_BY_GAME_ID_SERVER } from '../../../../../../graphql/queries/server/getJobsByGameIdServer';

const GameItem = ({ game }: any) => {

  // client
  const client = useApolloClient();
  const { player }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })

  // query
  const { loading, error, data } = useQuery(GET_JOBS_BY_GAME_ID_SERVER, { variables: { gameId: game.id } })

  if (loading) return null
  if (error) return null

  const playerRole = player.id === game.recruiterId ? 'Recruiter' : 'Applicant';

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
          {game.title}
        </div>
      </Link>
      <p>{`I am ${playerRole}`}</p>
    </div>
  )
}

export default GameItem;