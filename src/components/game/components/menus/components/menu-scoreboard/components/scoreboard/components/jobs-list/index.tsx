import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// apollo
import { GET_GAME_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../../../graphql/queries/client/getJobsByGameIdClient';

const JobsList = () => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })

  const appliedJobs = getJobsByGameId.filter((job: any) => job.isApplied === true)
  const acceptedJobs = getJobsByGameId.filter((job: any) => job.isAccepted === true)
  const ratio = appliedJobs.length / acceptedJobs.length * 100
  return (
    <div>
      <h4>JOBS: </h4>
      <p>Ratio applied/accepted jobs: {Math.round(ratio)}%</p>
      <h6>Applied jobs</h6>
      <ul>
        {appliedJobs.map((job: any) => <li key={`applied+${job.id}`}>{job.name} url: {job.url}</li>)}
      </ul>
      <h6>Accepted jobs</h6>
      <ul>
        {acceptedJobs.map((job: any) => <li key={`accepted+${job.id}`}>{job.name} url: {job.url}</li>)}
      </ul>
    </div>
  )
}

export default JobsList;