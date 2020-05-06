import * as React from 'react';
import NavBar from '../../../../../../../navbar';
import { useApolloClient } from '@apollo/client';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';

const Scoreboard = ({ path }: any) => {
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })
  return (
    <div>
      <NavBar />
      <div>
        <h3>Scoreboard</h3>
        <p>Missions accomplished: {game.missionsAccomplished}</p>
      </div>
    </div>
  )
}

export default Scoreboard