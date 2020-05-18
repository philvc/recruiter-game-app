import * as React from 'react';

// modules
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { Link } from '@reach/router';

// components
import NavBar from '../../../../../../../navbar';
import Contact from '../../../../../../../contact';
import ListProgress from '../mission/components/mission-10-job-offers/components/list-jobs/components/list-progress';

// style
import './style.css'

// grapqhql
import { GET_MISSIONS_SERVER } from '../../../../../../../../graphql/queries/server/getMissionsServer';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionsClient';
import { GET_MISSION_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_GAME_CLIENT } from '../../../../../../../../graphql/queries/client/getGameClient';
import { CREATE_MISSION } from '../../../../../../../../graphql/mutations/server/createMissionServer';
import { CREATE_JOBS } from '../../../../../../../../graphql/mutations/server/createJobsServer';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../graphql/queries/client/getJobsByGameIdClient';


const ListMissions = ({ path }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // state
  const [stateMissions, setStateMissions] = React.useState([])

  // queries
  const { loading, error, data } = useQuery(GET_MISSIONS_SERVER, {
    variables: { gameId: game.id },
    onCompleted(data) {
      const { missions } = data;
      client.writeQuery({
        query: GET_MISSIONS_CLIENT,
        variables: { gameId: game.id },
        data: {
          missions: [...missions]
        }
      })
      setStateMissions(missions.filter((mission: any) => mission.type === '10jobs'))
      localStorage.setItem('missions', JSON.stringify(missions))
    }

  }
  )

  // mutations
  const [createJobs] = useMutation(CREATE_JOBS, {
    onCompleted({ createJobs }) {

      // update client
      const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })

      const newJobsList = getJobsByGameId !== null ? getJobsByGameId.concat(createJobs) : createJobs

      client.writeQuery({
        query: GET_JOBS_BY_GAME_ID_CLIENT,
        variables: {
          gameId: game.id
        },
        data: {
          getJobsByGameId: newJobsList
        }
      })

      // update storage
      localStorage.setItem('jobs', JSON.stringify(newJobsList))
    }
  })

  const [createMission] = useMutation(CREATE_MISSION, {

    onCompleted({ createMission }) {

      // create 10 job offers
      createJobs({ variables: { gameId: game.id, missionType: 'mission10JobsId', missionId: createMission[0].id, quantity: 10 } })

      // update client
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_SERVER, variables: { gameId: game.id } })

      const newMissions = missions.concat(createMission)

      client.writeQuery({
        query: GET_MISSIONS_SERVER,
        variables: { gameId: game.id },
        data: {
          missions: newMissions
        }
      })

      // update state
      setStateMissions(newMissions.filter((mission: any) => mission.type === '10jobs'))

      // update storage
      localStorage.setItem('missions', JSON.stringify(newMissions))
    }
  })

  // effects
  React.useEffect(() => {

    if (data?.missions) {
      setStateMissions(data.missions.filter((mission: any) => mission.type === '10jobs'))
    }
  }, [data])


  // helpers
  function handleClick() {
    createMission({ variables: { type: '10jobs', gameId: game.id, quantity: 1 } })

  }

  if (loading) return null
  if (error) return null
  return (
    <div>
      <NavBar />
      <div className='mission-list-container'>
        <div>
          <h3>Menu Missions</h3>
        </div>
        {data && stateMissions.map((mission: any) => (
          <div key={mission.id}>
            <Link to={`${mission.id}`} onClick={() => {
              client.writeQuery({
                query: GET_MISSION_CLIENT,
                data: {
                  mission,
                }
              })
              localStorage.setItem('mission', JSON.stringify(mission))
            }}>
              <p>{mission.type}</p>
            </Link>
            <ListProgress mission={mission} />
            {mission.isReviewed && mission.status !== 'completed' && <p>Under review</p>}
            {mission.status === 'completed' && (
              <div>
                <p>Mission completed</p>
                <p>Score: {mission.score}</p>
              </div>
            )}
          </div>
        )
        )}
        <button onClick={handleClick}>Start "List 10 job offers" mission</button>
      </div>
      <Contact />
    </div>
  )
}

export default ListMissions;