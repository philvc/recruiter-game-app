import * as React from 'react';

// module
import { useApolloClient } from '@apollo/client';

// components
import NavBar from '../../../../../../../navbar';
import ChallengeScoreboard from './components/challenge-scoreboard';
import MissionScoreboard from './components/mission-scoreboard';
import AppliedJobsList from './components/applied-jobs';

// apollo
import { GET_MISSIONS_SERVER } from '../../../../../../../../graphql/queries/server/getMissionsServer';
import { GET_GAME_CLIENT } from '../../../../../../../../graphql/queries/client/getGameClient';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../graphql/queries/client/getJobsByGameIdClient';

const Scoreboard = ({ path }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { missions }: any = client.readQuery({ query: GET_MISSIONS_SERVER, variables: { gameId: game.id } })
  const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })

  const challenges = missions.filter((mission: any) => mission.type === 'jobapplication').filter((mission: any) => mission.status === 'completed')
  const recruiterMissions = missions.filter((mission: any) => mission.type === '10jobs').filter((mission: any) => mission.status === 'completed')
  const appliedJobs = getJobsByGameId.filter((job: any) => job.isApplied === true)

  return (
    <div>
      <NavBar />
      <div>
        <h3>Scoreboard</h3>
        <ChallengeScoreboard challenges={challenges} />
        <MissionScoreboard missions={recruiterMissions} />
        <AppliedJobsList appliedJobs={appliedJobs} />
      </div>
    </div>
  )
}

export default Scoreboard