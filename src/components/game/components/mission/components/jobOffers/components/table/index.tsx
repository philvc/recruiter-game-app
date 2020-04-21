import * as React from 'react';

// modules
import { useQuery } from '@apollo/react-hooks';

// graphql
import { GET_JOBS_SERVER } from '../../../../../../../../graphql/queries/server/getJobsServer';


const JobOffersTable = ({ missionId }: any) => {
  console.log('missionId', missionId)
  const { loading, error, data } = useQuery(GET_JOBS_SERVER, { variables: { missionId } })

  if (loading) return null
  if (error) return null
  return (
    <>
      <div>
        <ul>
          {data && data.jobs.map((job: any) => <li key={job.id}>{job.name}</li>)}
        </ul>
      </div>
    </>
  )
}

export default JobOffersTable;