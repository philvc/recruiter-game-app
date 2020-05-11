import * as React from 'react';
import { GET_ACCEPTED_JOBS_SERVER } from '../../../../../../../../../../graphql/queries/server/getAcceptedJobs';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_GAME_ID_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameIdClient';

const Select = ({ handleChange }: any) => {

  const client = useApolloClient()
  const { gameId }: any = client.readQuery({ query: GET_GAME_ID_CLIENT })
  const { loading, error, data }: any = useQuery(GET_ACCEPTED_JOBS_SERVER, { variables: { gameId } })
  const [jobList, setJobList] = React.useState([])


  React.useEffect(() => {
    if (data?.acceptedJobs) {
      setJobList(data?.acceptedJobs)
    }

  }, [data])

  if (loading) return null;
  if (error) return null;

  return (
    <div>
      <select name='select' style={{ width: '100px' }} onChange={handleChange}>
        <option></option>
        {jobList?.map((job: any, index: number) => <option value={job} key={job.id}>{job.url} rank:{job.rank}</option>)}
      </select>
    </div>
  )
}

export default Select;