import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// apollo
import { GET_GAME_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_MISSIONS_SERVER } from '../../../../../../../../../../graphql/queries/server/getMissionsServer';

// styles
import './styles.css'

const MissionScoreboard = () => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { missions }: any = client.readQuery({ query: GET_MISSIONS_SERVER, variables: { gameId: game.id } })


  const recruiterMissions = missions.filter((mission: any) => mission.type === '10jobs').filter((mission: any) => mission.status === 'completed')

  const total = recruiterMissions.length;
  const averageScore = recruiterMissions.map((mission: any) => mission.score).reduce((a: any, b: any) => a + b, 0) / total

  return (
    <>
      {/* <h4>Missions</h4> */}
      <tr>
        <th className='mission-scoreboard-header'>Number of missions '10 job offers'</th>
      </tr>
      <tr>
        <td className='mission-scoreboard-data'>{total}</td>
      </tr>
      <tr>
        <th className='mission-scoreboard-header'>Average score</th>
      </tr>
      <tr>
        <td className='mission-scoreboard-data'>{averageScore ? `${averageScore}/10` : 0}</td>
      </tr>
    </>
  )
}

export default MissionScoreboard;