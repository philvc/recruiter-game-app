import * as React from 'react';
import Select from '../select';
import Deadline from '../deadline';
import Message from '../message';

const NewChallenge = ({ handleChange, status, jobList, selectedJob, handleClick, message, isChallengeSent, isDateSelected }: any) => {
  const [isLoaded, setIsLoaded] = React.useState(false)

  return (
    <div>
      <p>Step 1: select 1 job </p>
      <Select handleChange={handleChange} status={status} jobList={jobList} selectedJob={selectedJob} />
      <p>{selectedJob?.url}</p>
      {selectedJob?.url && <Deadline handleChange={handleChange} />}
      {isDateSelected && <Message handleChange={handleChange} message={message} />}
      {message && <p><button onClick={handleClick}>Send challenge</button></p>}
      {isChallengeSent && <p><img style={selectedJob?.url && isLoaded ? {} : { display: 'none' }} src='https://media.giphy.com/media/1jkV5ifEE5EENHESRa/giphy.gif' alt='giphy video' onLoad={() => setIsLoaded(true)} /></p>}
    </div>
  )
}

export default NewChallenge