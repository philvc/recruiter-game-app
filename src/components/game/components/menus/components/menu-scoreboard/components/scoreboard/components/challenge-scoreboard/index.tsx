import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// apollo
import { GET_GAME_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_MISSIONS_SERVER } from '../../../../../../../../../../graphql/queries/server/getMissionsServer';

const ChallengeScoreboard = () => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { missions }: any = client.readQuery({ query: GET_MISSIONS_SERVER, variables: { gameId: game.id } })

  const challenges = missions.filter((mission: any) => mission.type === 'jobapplication').filter((mission: any) => mission.status === 'completed')
  const totalSucceeded = challenges.filter((challenge: any) => challenge.score).length
  const totalFailed = challenges.filter((challenge: any) => !challenge.score).length
  return (
    <div>
      <h4>CHALLENGES</h4>
      <p>Challenge succeeded: {totalSucceeded}</p>
      <p>Challenge failed: {totalFailed}</p>
    </div>
  )
}

export default ChallengeScoreboard;