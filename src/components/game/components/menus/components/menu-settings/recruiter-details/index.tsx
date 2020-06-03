import * as React from 'react';
import { useApolloClient } from '@apollo/client';
import { GET_PLAYER_CLIENT } from '../../../../../../../graphql/queries/client/getPlayerClient';
import { GET_GAME_CLIENT } from '../../../../../../../graphql/queries/client/getGameClient';

const RecruiterDetails = () => {

  // client
  const client = useApolloClient()
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  const { recruiter } = game;


  return (
    <div>
      <h5>Recruiter</h5>
      {player.id !== recruiter.id ? (
        <div>
          <p>Player name: {recruiter.playerName || 'not completed'}</p>
          <p>Email: {recruiter.email}</p>
        </div>
      )
        : <p>Me</p>

      }
    </div>
  )
}

export default RecruiterDetails;