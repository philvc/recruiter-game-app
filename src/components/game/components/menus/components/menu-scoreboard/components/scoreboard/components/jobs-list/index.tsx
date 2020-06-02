import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// apollo
import { GET_GAME_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../../../graphql/queries/client/getJobsByGameIdClient';

// styles
import './styles.css'

const JobsList = () => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })

  const appliedJobs = getJobsByGameId ? getJobsByGameId.filter((job: any) => job.isApplied === true) : []
  const acceptedJobs = getJobsByGameId ? getJobsByGameId.filter((job: any) => job.isAccepted === true) : []
  const ratio = appliedJobs.length / acceptedJobs.length * 100
  return (
    <>
      <tr>
        <th className='jobs-scoreboard-header'>Accepted jobs</th>
      </tr>
      {acceptedJobs.length > 0 ?
        <tr>
          <td className='jobs-scoreboard-data'>{acceptedJobs.length}</td>
        </tr>
        :
        <tr>
          <td className='jobs-scoreboard-data'>0</td>
        </tr>
      }
      <tr>
        <th className='jobs-scoreboard-header'>Applied jobs</th>
      </tr>

      {appliedJobs.length > 0 ?
        <tr>
          <td className='jobs-scoreboard-data'>{appliedJobs.length}</td>
        </tr>
        :
        <tr>
          <td className='jobs-scoreboard-data'>0</td>
        </tr>
      }
      <tr>
        <th className='jobs-scoreboard-header'>Applied / Accepted jobs</th>
      </tr>
      <tr>
        <td className='jobs-scoreboard-data'>{ratio ? `${Math.round(ratio)}%` : 0}</td>
      </tr>
    </>
  )
}

export default JobsList;