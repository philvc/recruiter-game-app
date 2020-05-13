import * as React from 'react';

// helpers
import { calculateCountDown } from '../../../challenge/components/countdown/helper';
import { useApolloClient } from '@apollo/client';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';


const ChallengeItem = ({ challenge, handleClick }: any) => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

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
      {challenge.status === 'completed' && (
        <p>
          {mission.score === 1 ? `Challenge succeeded: ${mission.score}/1` : `Challenge failed: ${mission.score}/1`}
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