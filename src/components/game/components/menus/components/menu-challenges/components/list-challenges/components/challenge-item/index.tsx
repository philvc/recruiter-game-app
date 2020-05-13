import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// components
import Countdown from '../../../challenge/components/countdown';

// apollo
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';


const ChallengeItem = ({ challenge, handleClick }: any) => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

  return (
    <div key={challenge.id}>
      <p>Apply for jobs</p>
      {challenge.status === 'pending' && (
        <div>
          <p>
            Progress:
            <Countdown missionTime={mission.time} />
          </p>
        </div>
      )}
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