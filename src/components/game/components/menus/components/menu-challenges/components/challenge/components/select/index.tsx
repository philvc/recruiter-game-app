import * as React from 'react';
import { GET_ACCEPTED_JOBS_SERVER } from '../../../../../../../../../../graphql/queries/server/getAcceptedJobs';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_GAME_ID_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameIdClient';

const Select = ({ setSelectedJob }: any) => {

  const client = useApolloClient()
  const { gameId }: any = client.readQuery({ query: GET_GAME_ID_CLIENT })
  const { loading, error, data }: any = useQuery(GET_ACCEPTED_JOBS_SERVER, { variables: { gameId } })
  const [jobList, setJobList] = React.useState([])

  React.useEffect(() => {
    if (data?.acceptedJobs) {
      setJobList(data?.acceptedJobs)
    }

  }, [data])

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