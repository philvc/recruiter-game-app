import * as React from 'react';

// components
import Countdown from '../countdown';
import Modal from '../../../../../../../../../modal';
import Screenshot from '../../../../../../../../../screenshot';

// apollo
import { useApolloClient } from '@apollo/client';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';

const PendingChallenge = () => {

  // client
  const client = useApolloClient();
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

  return (
    <div>
      <p><a href={mission.selectedJob?.url}>{mission.selectedJob?.url}</a></p>
      <Countdown missionTime={mission.time} />
      <Modal
        title='Job Application Screenshot'
        button={mission.selectedJob?.applicationProofUrl ? 'View' : 'Upload'}
        WrappedComponent={Screenshot}
      />
    </div>
  )
}

export default PendingChallenge;