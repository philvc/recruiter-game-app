import * as React from 'react';

// modules
import { useApolloClient, useMutation, gql } from '@apollo/client';
import { navigate } from '@reach/router';

// components
import Select from '../select';
import Deadline from '../deadline';
import Message from '../../../../../../../../../message';

// styles
import './styles.css'

// apollo
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';
import { START_JOB_APPLICATION } from '../../../../../../../../../../graphql/mutations/server/startJobApplication';
import { GET_GAME_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionsClient';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../graphql/mutations/server/updateJobServer';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../../../graphql/queries/client/getJobsByGameIdClient';
import { SEND_MESSAGE } from '../../../../../../../../../../graphql/mutations/server/sendMessage';
import { PUSH_NOTIFICATION } from '../../../../../../../../../../graphql/mutations/server/pushNotification';

const NewChallenge = () => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // state
  const [selectedJob, setSelectedJob] = React.useState({ id: '', url: '', })
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState(0)
  const [message, setMessage] = React.useState('')
  const [isChallengeSent, setIsChallengeSent] = React.useState(false)

  // mutations

  const [sendMessage] = useMutation(SEND_MESSAGE)
  const [pushNotification] = useMutation(PUSH_NOTIFICATION)
  const [startJobApplication] = useMutation(START_JOB_APPLICATION, {
    onCompleted({ startJobApplication }) {

      // update client
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })
      const newMissions = missions.concat([startJobApplication])

      client.writeQuery({
        query: GET_MISSION_CLIENT,
        data: {
          mission: startJobApplication,
        }
      })

      client.writeQuery({
        query: GET_MISSIONS_CLIENT,
        variables: {
          gameId: game.id,
        },
        data: newMissions
      })

      // update storage
      localStorage.setItem('mission', JSON.stringify(startJobApplication))
      localStorage.setItem('missions', JSON.stringify(newMissions))

      // redirect
      // navigate problem
      navigate(`/challenges/${game.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('')}/applications`)
    }
  })


  const [updateJob] = useMutation(UPDATE_JOB_SERVER, {
    onCompleted({ updateJob }) {

      // update client
      client.writeFragment({
        id: `Job:${updateJob.id}`,
        fragment: gql`
          fragment IsSelectedAndMissionId on Job {
            isSelected
            missionJobApplicationId
          }
        `,
        data: {
          isSelected: updateJob.isSelected,
          missionJobApplicationId: updateJob.missionJobApplicationId
        }
      })

      //update storage
      const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })
      localStorage.setItem('jobs', JSON.stringify(getJobsByGameId))
    }
  })

  // handlers
  function handleClick() {
    const params = {
      missionId: mission.id,
      jobId: selectedJob.id,
      gameId: game.id,
      message,
      jobUrl: selectedJob.url,
      time: selectedDate,
    }
    setIsChallengeSent(true)

    updateJob({
      variables: {
        id: selectedJob.id,
        field: 'isSelected',
        data: true,
      }
    })

    updateJob({
      variables: {
        id: selectedJob.id,
        field: 'missionJobApplicationId',
        data: mission.id
      }
    })

    startJobApplication({ variables: params })

    sendMessage({
      variables:
      {
        recipientId: game.applicantId,
        subject: 'Quick ! You have a new challenge',
        message: 'Go see your new Challenge & apply for a new job',
        link: selectedJob.url,
      }
    })

    pushNotification({
      variables: {
        recipientId: game.applicantId,
        label: 'You have to apply to a new job selected by your friend !',
        gameId: game.id,
      }
    })

  }

  return (
    <div className='newChallenge-container'>
      <p>Step 1:</p>
      <div>Select 1 job</div>
      <Select setSelectedJob={setSelectedJob} />
      {selectedJob?.url && (
        <div>
          <Deadline setSelectedDate={setSelectedDate} />
        </div>
      )}
      {selectedJob?.url && selectedDate !== 0 && (
        <div className='newChallenge-container-step3'>
          <p>Step 3:</p>
          <div className='newChallenge-container-step3-message'>Send an message to your friend</div>
          <Message setMessage={setMessage} message={message} />
        </div>
      )}
      {message && <p><button onClick={handleClick}>Send challenge</button></p>}
      {isChallengeSent && <p><img style={selectedJob?.url && isLoaded ? {} : { display: 'none' }} src='https://media.giphy.com/media/1jkV5ifEE5EENHESRa/giphy.gif' alt='giphy video' onLoad={() => setIsLoaded(true)} /></p>}
    </div>
  )
}

export default NewChallenge