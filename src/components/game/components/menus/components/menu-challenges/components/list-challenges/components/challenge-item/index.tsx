import * as React from 'react';

// components
import Countdown from '../../../challenge/components/countdown';

// styles
import './styles.css'

const ChallengeItem = ({ challenge, handleClick }: any) => {


  return (
    <div className="challenge-item-container" key={challenge.id}>
      <p>Apply for 1 job</p>
      {challenge.status === 'pending' && (
        <div>
          <p>
            Progress:
            <div className='challengeItem-countdown'>
              <Countdown mission={challenge} />
            </div>
          </p>
        </div>
      )}
      {challenge.status === 'completed' && (
        <p>
          {challenge.score === 1 ? `Challenge succeeded: ${challenge.score}/1` : `Challenge failed: 0/1`}
        </p>
      )}
      <button onClick={() => handleClick(challenge)}>
        {challenge.status === 'new' ?
          'Start'
          :
          challenge.status === 'completed' ?
            'View result'
            :
            challenge.status === 'pending' && challenge.isUnderReview ?
              'Review'
              :
              'Resume'
        }
      </button>
    </div>
  )
}

export default ChallengeItem;