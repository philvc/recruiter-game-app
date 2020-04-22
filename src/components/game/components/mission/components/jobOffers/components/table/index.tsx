import * as React from 'react';

// modules
import { useQuery, useMutation } from '@apollo/react-hooks';

// components
import JobRow from './components/jobRow';

// graphql
import { GET_JOBS_SERVER } from '../../../../../../../../graphql/queries/server/getJobsServer';
import { GET_JOBS_CLIENT } from '../../../../../../../../graphql/queries/client/getJobsClient';

// reducer
import { initialState, reducer } from './reducer';
import { UPDATE_ALL_JOBS_SERVER } from '../../../../../../../../graphql/mutations/server/updateAllJobsServer';

// helpers
import { updateJobs } from './helpers';

const JobOffersTable = ({ missionId }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { loading, error } = useQuery(GET_JOBS_SERVER, {
    variables: { missionId },
    onCompleted({ jobs }) {

      dispatch({ type: 'stateChanged', payload: jobs })

    }
  });
  const [updateAllJobsServer] = useMutation(UPDATE_ALL_JOBS_SERVER,
    {
      update(cache, { data: { updateAllJobs } }) {
        cache.writeQuery({
          query: GET_JOBS_CLIENT,
          variables: { missionId },
          data: {
            jobs: [...updateAllJobs]
          }
        })
      }
    }
  )

  React.useEffect(() => {
    return () => {
      console.log('return function use effect')

      updateJobs(state, updateAllJobsServer)
    }
  }, [state])

  function handleChange(e: any, index: number, job: any) {
    dispatch({ type: e.target.name, payload: { index, data: e.target.value } })
  }

  if (loading) return null
  if (error) return null
  return (
    <>
      <div>
        {state.length > 0 && state.map((job: any, index: number) => (
          <div key={job.id}>
            <JobRow job={job} index={index} handleChange={handleChange} />
          </div>
        )
        )}
      </div>
    </>
  )
}

export default JobOffersTable;