import * as React from 'react';

// modules
import { useQuery, useApolloClient } from '@apollo/client';
import update from 'immutability-helper'


// components
import DraggableJob from './components/draggableJob';
import ListProgress from './components/list-progress';

// graphql
import { GET_JOBS_SERVER } from '../../../../../../../../../../../../graphql/queries/server/getJobsServer';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../graphql/queries/client/getMissionClient';

const List = () => {

  // client
  const client = useApolloClient();
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

  // state 
  const [jobs, setJobs] = React.useState([])

  // queries
  const { loading, error, data } = useQuery(GET_JOBS_SERVER, {
    variables: { missionId: mission.id },
    onCompleted({ jobs }) {
      const jobsSortedByRank = jobs.slice().sort((a: any, b: any) => {
        return a.rank - b.rank
      })
      setJobs(jobsSortedByRank)
    }
  });

  // effects
  React.useEffect(() => {
    if (data) {
      const { jobs } = data
      const jobsSortedByRank = jobs.slice().sort((a: any, b: any) => {
        return a.rank - b.rank
      })
      setJobs(jobsSortedByRank)
    }
  }, [data])

  // helpers
  const moveJob = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragJob = jobs[dragIndex]
      setJobs((prevJobs: any) => {
        const newState = update(prevJobs, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragJob],
          ],
        })
        return newState
      })

    },
    [jobs],
  )

  if (loading) return null
  if (error) return null

  return (
    <>
      <div>
        <ListProgress jobs={jobs} />
        {
          jobs
            .map((job: any, index: number) => (
              <DraggableJob
                key={job.id}
                id={job.id}
                index={index}
                moveJob={moveJob}
                job={job}
              />
            )
            )}
      </div>
    </>
  )
}

export default List;