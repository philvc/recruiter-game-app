import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';
import update from 'immutability-helper'

// styles
import './styles.css';

// components
import DraggableJob from './components/draggableJob';

// graphql
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_GAME_CLIENT } from '../../../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../../../../../graphql/queries/client/getJobsByGameIdClient';

const List = ({ setProgress }: any) => {

  // client
  const client = useApolloClient();
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })

  // filter jobs for missionId
  const filteredJobs = getJobsByGameId.filter((job: any) => job.mission10JobsId === mission.id)
  const jobsSortedByRank = filteredJobs.slice().sort((a: any, b: any) => {
    return a.rank - b.rank
  })

  // state 
  const [jobs, setJobs] = React.useState(jobsSortedByRank)

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

  return (
    <>
      <div className="tenJobs-mission-list-container">
        <table>
          <tbody>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Url</th>
            </tr>
            {
              jobs
                .map((job: any, index: number) => (
                  <DraggableJob
                    key={job.id}
                    id={job.id}
                    index={index}
                    moveJob={moveJob}
                    job={job}
                    setProgress={setProgress}
                  />
                )
                )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default List;