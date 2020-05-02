import * as React from 'react';

// modules
import { useQuery } from '@apollo/client';
import update from 'immutability-helper'


// components
import JobRow from './components/jobRow';
import { GET_JOBS_SERVER } from '../../../../../../../../../../../../graphql/queries/server/getJobsServer';

// graphql

const JobOffersTable = ({ missionId }: any) => {

  const [jobs, setJobs] = React.useState([])
  const { loading, error, data } = useQuery(GET_JOBS_SERVER, {
    variables: { missionId },
    onCompleted({ jobs }) {
      const jobsSortedByRank = jobs.slice().sort((a: any, b: any) => {
        return a.rank - b.rank
      })
      setJobs(jobsSortedByRank)

    }
  });

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
        {jobs.length > 0 &&
          jobs
            .map((job: any, index: number) => (
              <JobRow
                key={job.id}
                index={index}
                id={job.id}
                job={job}
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