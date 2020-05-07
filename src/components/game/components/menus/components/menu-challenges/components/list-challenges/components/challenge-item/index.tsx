import * as React from 'react';
import { calculateCountDown } from '../../../challenge/components/countdown/helper';


const ChallengeItem = ({ challenge, handleClick }: any) => {
  const [countdown, setCountDown] = React.useState('')
  if (countdown !== 'EXPIRED') {
    console.log('challengetime', challenge.time)
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