import * as React from 'react';

// components
import Countdown from '../countdown';
import Modal from '../../../../../../../../../modal';
import Screenshot from '../../../../../../../../../screenshot';

// styles
import './styles.css';

// apollo
import { useApolloClient } from '@apollo/client';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';

const PendingChallenge = () => {

  // client
  const client = useApolloClient();
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

  return (
    <div className='pendingChallenge-container'>
      <p><a style={{ color: '#0000EE', textDecoration: 'none' }} href={mission.selectedJob?.url} target="_blank">{mission.selectedJob?.name}</a></p>
      <p>
        <Countdown mission={mission} />
      </p>
      <p>
        <Modal
          title='Job Application Screenshot'
          button={mission.selectedJob?.applicationProofUrl ? 'View the application proof' : 'Upload a proof of your application'}
          WrappedComponent={Screenshot}
        />
      </p>
    </div>
  )
}

export default PendingChallenge;