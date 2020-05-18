import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// apollo
import { GET_GAME_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../../../graphql/queries/client/getJobsByGameIdClient';

const Select = ({ setSelectedJob }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })

  // state
  const filteredJobs = getJobsByGameId
    .filter((job: any) => job.gameId === game.id)
    .filter((job: any) => job.isAccepted === true)

  const [jobList, setJobList] = React.useState(filteredJobs)

  // handler
  function handleChange(e: any) {
    const job = jobList[e.target.value]
    setSelectedJob(job)
  }

  return (
    <div>
      <select name='select' style={{ width: '100px' }} onChange={handleChange}>
        <option></option>
        {jobList?.map((job: any, index: number) =>
          (<option
            value={index}
            key={job.id}
          >
            {job.url} rank:{job.rank}
          </option>
          ))}
      </select>
    </div>
  )
}

export default Select;