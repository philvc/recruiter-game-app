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
      {challenge.status === 'completed' && <p>Challenge succeeded Or Failed</p>}
      <button onClick={() => handleClick(challenge)}>
        {challenge.status === 'new' ?
          'Start'
          :
          challenge.status === 'pending' ?
            'Resume'
            :
            'View result'
        }
      </button>
    </div>
  )
}

export default ChallengeItem;