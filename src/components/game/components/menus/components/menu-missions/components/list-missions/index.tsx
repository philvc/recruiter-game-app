import * as React from 'react';

// modules
import { useMutation, useApolloClient, useQuery } from '@apollo/client';
import { Link, navigate } from '@reach/router';

// components
import NavBar from '../../../../../../../navbar';
import Contact from '../../../../../../../contact';
import ListProgress from './components/list-progress';

// types
import MissionInterface from '../../../../../../../../types/mission';

// style
import './styles.css'

// grapqhql
import { GET_MISSIONS_SERVER } from '../../../../../../../../graphql/queries/server/getMissionsServer';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionsClient';
import { GET_MISSION_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_GAME_CLIENT } from '../../../../../../../../graphql/queries/client/getGameClient';
import { CREATE_MISSION } from '../../../../../../../../graphql/mutations/server/createMissionServer';
import { CREATE_JOBS } from '../../../../../../../../graphql/mutations/server/createJobsServer';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../graphql/queries/client/getJobsByGameIdClient';
import { PUSH_NOTIFICATION } from '../../../../../../../../graphql/mutations/server/pushNotification';
import { GET_PLAYER_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerClient';


const ListMissions = ({ path }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })

  // state
  const [stateMissions, setStateMissions] = React.useState([])
  const [newMission, setNewMission] = React.useState<MissionInterface | undefined>(undefined)

  // query
  const { loading: missionsLoading, error: missionsError, data: missionsData } = useQuery(GET_MISSIONS_CLIENT, {
    variables: { gameId: game.id }
  })

  // mutations
  const [createJobs] = useMutation(CREATE_JOBS, {
    onCompleted({ createJobs }) {

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

      localStorage.setItem('jobs', JSON.stringify(newJobsList))

      navigate(`/challenges/${game.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('')}/lists/${newMission?.id}`)
    }
  })

  const [createMission] = useMutation(CREATE_MISSION, {

    onCompleted({ createMission }) {

      // create 10 job offers
      createJobs({ variables: { gameId: game.id, missionType: 'mission10JobsId', missionId: createMission[0].id, quantity: 10 } })

      const { missions }: any = client.readQuery({ query: GET_MISSIONS_SERVER, variables: { gameId: game.id } })
      const newMissions = missions.concat(createMission)

      // update missions
      client.writeQuery({
        query: GET_MISSIONS_SERVER,
        variables: { gameId: game.id },
        data: {
          missions: newMissions
        }
      })

      setStateMissions(newMissions.filter((mission: any) => mission.type === '10jobs'))

      localStorage.setItem('missions', JSON.stringify(newMissions))

      // update mission
      client.writeQuery({
        query: GET_MISSION_CLIENT,
        data: {
          mission: createMission[0]
        }
      })

      setNewMission(createMission[0])

      localStorage.setItem('mission', JSON.stringify(createMission[0]))
    }
  })

  const [pushNotification] = useMutation(PUSH_NOTIFICATION)

  // effects
  React.useEffect(() => {
    if (missionsData) {
      const filteredMissions = missionsData.missions !== null ? missionsData.missions.filter((mission: any) => mission.type === '10jobs') : []
      setStateMissions(filteredMissions)
    }
  }, [missionsData])


  // handlers
  function handleClick() {
    createMission({ variables: { type: '10jobs', gameId: game.id, quantity: 1 } })
    pushNotification({
      variables: {
        recipientId: game.applicant.id,
        label: 'Your recruiter has started a new "10 job offers" mission ;)',
        gameId: game.id,
      }
    })

  }

  if (missionsLoading) return null;
  if (missionsError) return null;

  return (
    <div className='list-missions-container'>
      <NavBar />
      <div className='list-missions-container-body'>
        <div>
          <h3>Job Lists</h3>
        </div>
        {missionsData.missions.length === 0 && stateMissions.length === 0 && (
          <div className='list-missions-description-container'>
            <p>Welcome !</p>
            <p>Congrats for helping your friend finding a new job.</p>
            <p>Your friend has been invited by email to join this game as job applicant.</p>
            <p>Lets start one and prepare a good surprise for your friend!</p>
          </div>
        )}
        {player.id === game.recruiter.id && <div className='start-mission-button'>
          <button onClick={handleClick}>Start a new job list</button>
        </div>}
        <div className='list-missions-body'>
          {stateMissions.map((mission: any) => (
            <div key={mission.id} className='list-missions-item'>
              <Link
                to={`${mission.id}`}
                onClick={() => {
                  client.writeQuery({
                    query: GET_MISSION_CLIENT,
                    data: {
                      mission,
                    }
                  })
                  localStorage.setItem('mission', JSON.stringify(mission))
                }}
                getProps={() => {
                  return {
                    style: {
                      color: "#0000EE",
                      textDecoration: "none",
                    }
                  };
                }}
              >
                <p>{mission.type}</p>
              </Link>
              <ListProgress mission={mission} />
              {mission.isUnderReview && mission.status !== 'completed' && <p>Under review</p>}
              {mission.status === 'completed' && (
                <div>
                  <p>Mission completed</p>
                  <p>Score: {mission.score}</p>
                </div>
              )}
            </div>
          )
          )}
        </div>
      </div>
      <Contact />
    </div>
  )
}

export default ListMissions;