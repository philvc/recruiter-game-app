import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// apollo
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';

const CompletedChallenge = () => {

  // client
  const client = useApolloClient();
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

  return (
    <div>
      <p>{mission.selectedJob.name}</p>
      {mission.score === 0 ?
        (<p>Challenge failed but you can still select this job offer for a next challenge</p>)
        :
        (<img src={mission.selectedJob.applicationProofUrl} alt='application screenshot' />)
      }
    </div>
  )
}

export default CompletedChallenge;