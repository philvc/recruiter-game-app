import * as React from 'react';

// modules
import { useApolloClient, useMutation } from '@apollo/client';
import { navigate } from '@reach/router';

// components
import Select from '../select';
import Deadline from '../deadline';
import Message from '../../../../../../../../../message';

// apollo
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';
import { START_JOB_APPLICATION } from '../../../../../../../../../../graphql/mutations/server/startJobApplication';
import { GET_GAME_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionsClient';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../graphql/mutations/server/updateJobServer';
import { GET_ACCEPTED_JOBS_SERVER } from '../../../../../../../../../../graphql/queries/server/getAcceptedJobs';

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
  const [startJobApplication] = useMutation(START_JOB_APPLICATION, {
    onCompleted({ startJobApplication }: any) {
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
      localStorage.setItem('mission', JSON.stringify(startJobApplication))
      localStorage.setItem('missions', JSON.stringify(newMissions))

      navigate(`/games/${game.title.split(" ").join('')}/challenges`)

    }
  })

  const [updateJob] = useMutation(UPDATE_JOB_SERVER, {
    onCompleted({ updateJob }) {
      console.log('updateJob', updateJob)
      // update client
      const { acceptedJobs }: any = client.readQuery({ query: GET_ACCEPTED_JOBS_SERVER, variables: { gameId: game.id } })
      const filterAcceptedJobs = acceptedJobs.filter((job: any) => job.id !== updateJob.id)
      console.log('filteracceptejobs', filterAcceptedJobs)
      client.writeQuery({
        query: GET_ACCEPTED_JOBS_SERVER,
        variables: {
          gameId: game.id
        },
        data: {
          acceptedJobs: filterAcceptedJobs
        }
      })

      // TODO storage mission

      // update storage
      localStorage.setItem('acceptedJobs', JSON.stringify(filterAcceptedJobs))
    }
  })

  // helpers
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

    startJobApplication({ variables: params })
  }

  return (
    <div>
      <p>Step 1: select 1 job </p>
      <Select setSelectedJob={setSelectedJob} />
      <p>{selectedJob?.url}</p>
      {selectedJob?.url && (
        <div>
          <Deadline setSelectedDate={setSelectedDate} />
          <Message setMessage={setMessage} message={message} />
        </div>
      )}
      {message && <p><button onClick={handleClick}>Send challenge</button></p>}
      {isChallengeSent && <p><img style={selectedJob?.url && isLoaded ? {} : { display: 'none' }} src='https://media.giphy.com/media/1jkV5ifEE5EENHESRa/giphy.gif' alt='giphy video' onLoad={() => setIsLoaded(true)} /></p>}
    </div>
  )
}

export default NewChallenge