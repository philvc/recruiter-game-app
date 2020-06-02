import * as React from 'react';

// modules
import { useMutation, useQuery, useApolloClient, useSubscription } from '@apollo/client';
import { Link } from '@reach/router';

// components
import NavBar from '../../../../../../../navbar';
import Contact from '../../../../../../../contact';
import ListProgress from './components/list-progress';

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
import { NEW_MISSION_SUBSCRIPTION } from '../../../../../../../../graphql/subscriptions/newMission';
import { GET_PLAYER_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerClient';


const ListMissions = ({ path }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })

  // state
  const [stateMissions, setStateMissions] = React.useState([])

  // queries
  const { loading, error, data, subscribeToMore } = useQuery(GET_MISSIONS_SERVER, {
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

  const [pushNotification] = useMutation(PUSH_NOTIFICATION)

  // effects
  React.useEffect(() => {

    if (data?.missions) {
      setStateMissions(data.missions.filter((mission: any) => mission.type === '10jobs'))
    }
  }, [data])

  React.useEffect(() => {
    if (game.applicant.id === player.id) {
      subscribeToMore({
        document: NEW_MISSION_SUBSCRIPTION,
        variables: { gameId: game.id },
        updateQuery: (prev: any, { subscriptionData }: any) => {
          if (!subscriptionData) return prev;
          console.log('new missionSubMore', subscriptionData)
          console.log('prev', prev)
          return Object.assign({}, prev, {
            missions: [...prev.missions, subscriptionData.data.newMission]
          })
        }
      })
    }
  }, [subscribeToMore, game.id, game.applicant.id, player.id])

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



  if (loading) return null
  if (error) return null
  return (
    <div className='list-missions-container'>
      <NavBar />
      <div className='list-missions-container-body'>
        <div>
          <h3>Menu Missions</h3>
        </div>
        {data && stateMissions.length === 0 && (
          <div className='list-missions-description-container'>
            <p>Welcome !</p>
            <p>Congrats for helping your friend finding a new job.</p>
            <p>Your friend has been invited by email to join this game as job applicant.</p>
            <p>One mission is already available: the 10 job offers mission.</p>
            <p>Lets start one and prepare a good surprise for your friend!</p>
          </div>
        )}
        <div className='start-mission-button'>
          <button onClick={handleClick}>Start "10 job offers" mission</button>
        </div>
        <div className='list-missions-body'>
          {data && stateMissions.map((mission: any) => (
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