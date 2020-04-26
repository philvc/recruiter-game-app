import * as React from 'react';

// modules
import { useQuery, useMutation } from '@apollo/react-hooks';

// components
import JobRow from './components/jobRow';

// graphql
import { GET_JOBS_SERVER } from '../../../../../../../../graphql/queries/server/getJobsServer';
import { GET_JOBS_CLIENT } from '../../../../../../../../graphql/queries/client/getJobsClient';
import { UPDATE_ALL_JOBS_SERVER } from '../../../../../../../../graphql/mutations/server/updateAllJobsServer';

// reducer
import { initialState, reducer } from './reducer';

// helpers
import { updateJobs } from './helpers';

const JobOffersTable = ({ missionId }: any) => {

  const [state, dispatch] = React.useReducer(reducer, initialState)
  const jobsRef = React.useRef(state)
  const { loading, error } = useQuery(GET_JOBS_SERVER, {
    variables: { missionId },
    onCompleted({ jobs }) {
      dispatch({ type: 'stateChanged', payload: jobs })

    }
  });
  const [updateAllJobsServer] = useMutation(UPDATE_ALL_JOBS_SERVER,
    {
      update(cache, { data: { updateAllJobs } }) {
        console.log('updated jobs', updateAllJobs)
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

  jobsRef.current = state

  React.useEffect(() => {
    // updateJobs(state, updateAllJobsServer)
    // if (data) {
    //   dispatch({ type: 'stateChanged', payload: data.jobs })
    // }
    return () => {
      const jobsWithUpdatedRank = jobsRef.current.map((job: any, index: any) => {
        job.rank = index + 1
        return job
      })
      console.log('jobs updateRank front ', jobsWithUpdatedRank)
      updateJobs(jobsWithUpdatedRank, updateAllJobsServer)
    }
  }, [state, updateAllJobsServer])

  function handleChange(e: any, index: number, job: any) {
    dispatch({ type: e.target.name, payload: { index, data: e.target.value } })
  }

  const moveJob = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragJob = state[dragIndex]
      dispatch({
        type: 'jobDragged', payload: {
          dragJob,
          dragIndex,
          hoverIndex
        }
      })
    },
    [state],
  )


  if (loading) return null
  if (error) return null

  return (
    <>
      <div>
        {state.length > 0 &&
          state
            // .sort(function (a: any, b: any) { return a.rank - b.rank })
            .map((job: any, index: number) => (
              // renderJobRow(job, index)
              <JobRow
                key={job.id}
                index={index}
                id={job.id}
                job={job}
                handleChange={handleChange}
                moveJob={moveJob}
                missionId={missionId}
              />
            )
            )}
      </div>
    </>
  )
}

export default JobOffersTable;