import * as React from 'react';

// modules
import { useQuery, useMutation } from '@apollo/react-hooks';
import JobRow from './components/jobRow';

// graphql
import { GET_JOBS_SERVER } from '../../../../../../../../graphql/queries/server/getJobsServer';
import { initialState, reducer } from './reducer';


const JobOffersTable = ({ missionId }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { loading, error, data } = useQuery(GET_JOBS_SERVER, {
    variables: { missionId },
    onCompleted({ jobs }) {
      dispatch({ type: 'stateChanged', payload: jobs })

    }
  });

  function handleChange(e: any, index: number) {
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