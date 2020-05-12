import * as React from 'react';

// modules
import { useQuery, useApolloClient } from '@apollo/client';

// apollo
import { GET_ACCEPTED_JOBS_SERVER } from '../../../../../../../../../../graphql/queries/server/getAcceptedJobs';
import { GET_GAME_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameClient';

const Select = ({ setSelectedJob }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // state
  const [jobList, setJobList] = React.useState([])

  // queries
  const { loading, error, data }: any = useQuery(GET_ACCEPTED_JOBS_SERVER, { variables: { gameId: game.id } })

  // effect
  React.useEffect(() => {
    if (data?.acceptedJobs) {
      setJobList(data?.acceptedJobs)
    }

  }, [data])

  // handler
  function handleChange(e: any) {
    const job = jobList[e.target.value]
    setSelectedJob(job)
  }

  if (loading) return null;
  if (error) return null;

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