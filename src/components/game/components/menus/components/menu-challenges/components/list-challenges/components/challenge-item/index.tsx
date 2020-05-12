import * as React from 'react';

// helpers
import { calculateCountDown } from '../../../challenge/components/countdown/helper';


const ChallengeItem = ({ challenge, handleClick }: any) => {

  // state
  const [countdown, setCountDown] = React.useState('')

  // countdown computation
  if (challenge.status !== 'new' && countdown !== 'EXPIRED') {
    calculateCountDown(parseInt(challenge.time, 10), setCountDown)
  }

  return (
    <div key={challenge.id}>
      <p>Apply for jobs</p>
      {challenge.status === 'pending' && <p>Progress: {countdown}</p>}
      <button onClick={() => handleClick(challenge)}>{challenge.status === 'new' ? 'Start' : 'Resume'}</button>
    </div>
  )
}

export default ChallengeItem;