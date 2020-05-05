import * as React from 'react';
import { Link } from '@reach/router';
import { useApolloClient, gql } from '@apollo/client';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../graphql/queries/client/getPlayerAndGamesClient';

const GameItem = ({ game }: any) => {
  const client = useApolloClient();
  const { player }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })
  const playerRole = player.id === game.recruiterId ? 'Recruiter' : 'Applicant';
  return (
    <div>
      <Link to={`${game.title.split(" ").join('')}/missions`}>
        <div className='game-link' onClick={() => {

          client.writeQuery(
            {
              query: GET_PLAYERANDGAMES_CLIENT,
              data: {
                gameId: game.id,
                game,
              }
            })
          localStorage.setItem('gameId', game.id)
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