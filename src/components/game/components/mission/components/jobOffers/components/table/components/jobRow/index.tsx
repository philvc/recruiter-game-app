import * as React from 'react';
import { useMutation } from '@apollo/react-hooks';

// graphql
import { GET_JOBS_CLIENT } from '../../../../../../../../../../graphql/queries/client/getJobsClient';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../graphql/mutations/server/updateJobsServer';

const JobRow = ({ job, index, handleChange }: any) => {

  const { missionId, id } = job
  const [updateJob] = useMutation(UPDATE_JOB_SERVER, {
    update(cache, { data: { updateJob } }) {
      const { jobs }: any = cache.readQuery({ query: GET_JOBS_CLIENT, variables: { missionId } })
      cache.writeQuery({
        query: GET_JOBS_CLIENT,
        variables: { missionId },
        data: {
          jobs: jobs.map((job: any) => {
            if (job.id === id) {
              return updateJob[0]
            }
            return job
          })
        }
      })
    }
  })

  function handleBlur(e: any) {
    e.stopPropagation()
    console.log('id :', id)
    updateJob({
      variables: {
        id: id,
        field: e.target.name,
        data: e.target.value,
      }
    })

  }

  return (
    <div onBlur={handleBlur}>
      <input name='url' value={job.url} onChange={(e) => handleChange(e, index)} />
      <input name='name' value={job.name} onChange={(e) => handleChange(e, index)} />
    </div>
  )
}

export default JobRow;