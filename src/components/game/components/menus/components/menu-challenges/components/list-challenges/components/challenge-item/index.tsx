import * as React from 'react';

// components
import Countdown from '../../../challenge/components/countdown';


const ChallengeItem = ({ challenge, handleClick }: any) => {


  return (
    <div key={challenge.id}>
      <p>Apply for jobs</p>
      {challenge.status === 'pending' && (
        <div>
          <p>
            Progress:
            <Countdown mission={challenge} />
          </p>
        </div>
      )}
      {challenge.status === 'completed' && (
        <p>
          {challenge.score === 1 ? `Challenge succeeded: ${challenge.score}/1` : `Challenge failed: ${challenge.score}/1`}
        </p>
      )}
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