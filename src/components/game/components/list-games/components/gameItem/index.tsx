import * as React from 'react';

// modules
import { Link } from '@reach/router';
import { useApolloClient, useLazyQuery } from '@apollo/client';

// apollo
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import { GET_ACCEPTED_JOBS_SERVER } from '../../../../../../graphql/queries/server/getAcceptedJobs';

const GameItem = ({ game }: any) => {

  // client
  const client = useApolloClient();
  const { player }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })

  // queries
  const [getAcceptedJobs] = useLazyQuery(GET_ACCEPTED_JOBS_SERVER, {
    variables: {
      gameId: game.id,
    }
  })

  const playerRole = player.id === game.recruiterId ? 'Recruiter' : 'Applicant';

  return (
    <div>
      <Link to={`${game.title.split(" ").join('')}/missions`}>
        <div className='game-link' onClick={() => {
          client.writeQuery(
            {
              query: GET_PLAYERANDGAMES_CLIENT,
              data: {
                game,
              }
            })

          getAcceptedJobs()

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