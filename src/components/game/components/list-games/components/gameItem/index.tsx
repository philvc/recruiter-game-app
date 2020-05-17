import * as React from 'react';

// modules
import { Link } from '@reach/router';
import { useApolloClient, useLazyQuery } from '@apollo/client';

// apollo
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import { GET_JOBS_BY_GAME_ID } from '../../../../../../graphql/queries/server/getJobsByGameIdServer';

const GameItem = ({ game }: any) => {

  // client
  const client = useApolloClient();
  const { player }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })

  // query
  const [getJobsByGameId] = useLazyQuery(GET_JOBS_BY_GAME_ID, {

    onCompleted({ getJobsByGameId }) {
      console.log('lazy query result', getJobsByGameId)

      localStorage.setItem('jobs', JSON.stringify(getJobsByGameId))
    }
  })

  const playerRole = player.id === game.recruiterId ? 'Recruiter' : 'Applicant';

  return (
    <div>
      <Link to={`${game.title.split(" ").join('')}/missions`}>
        <div className='game-link' onClick={() => {

          // query
          getJobsByGameId({
            variables: {
              gameId: game.id,
            }
          })

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