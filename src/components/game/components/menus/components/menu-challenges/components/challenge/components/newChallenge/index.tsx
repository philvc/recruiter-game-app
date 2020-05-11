import * as React from 'react';
import Select from '../select';
import Deadline from '../deadline';
import Message from '../message';
import { useApolloClient, gql, useMutation } from '@apollo/client';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_GAME_ID_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameIdClient';
import { START_JOB_APPLICATION } from '../../../../../../../../../../graphql/mutations/server/startJobApplication';

const NewChallenge = () => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { gameId }: any = client.readQuery({ query: GET_GAME_ID_CLIENT })

  // state
  const [selectedJob, setSelectedJob] = React.useState({ id: '', url: '', })
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState(0)
  const [isDateSelected, setIsDateSelected] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [isChallengeSent, setIsChallengeSent] = React.useState(false)

  // mutations
  const [startJobApplication] = useMutation(START_JOB_APPLICATION, {
    onCompleted({ startJobApplication }: any) {
      client.writeQuery({
        query: gql`
        {
          mission
        }`,
        data: {
          mission: startJobApplication,
        }
      })
      localStorage.setItem('mission', JSON.stringify(startJobApplication))
    }
  })

  function handleClick() {
    const params = {
      mission: mission.id,
      jobId: selectedJob.id,
      gameId,
      message,
      jobUrl: selectedJob.url,
      time: selectedDate,
    }
    setIsChallengeSent(true)
    startJobApplication({ variables: params })
  }

  function handleChange(e: any) {
    switch (e.target.name) {
      case 'select':
        return setSelectedJob(e.target.value);
      case 'date':
        setSelectedDate(e.target.value)
        return setIsDateSelected(true);
      case 'message':
        return setMessage(e.target.value)
      default:
        return null
    }
  }

  console.log('selectedJob', selectedJob)

  return (
    <div>
      <p>Step 1: select 1 job </p>
      <Select handleChange={handleChange} />
      <p>{selectedJob?.url}</p>
      {selectedJob?.url && <Deadline handleChange={handleChange} />}
      {isDateSelected && <Message handleChange={handleChange} message={message} />}
      {message && <p><button onClick={handleClick}>Send challenge</button></p>}
      {isChallengeSent && <p><img style={selectedJob?.url && isLoaded ? {} : { display: 'none' }} src='https://media.giphy.com/media/1jkV5ifEE5EENHESRa/giphy.gif' alt='giphy video' onLoad={() => setIsLoaded(true)} /></p>}
    </div>
  )
}

export default NewChallenge