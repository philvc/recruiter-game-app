import * as React from 'react';

// components
import Countdown from '../countdown';
import Modal from '../../../../../../../../../modal';
import Screenshot from '../../../../../../../../../screenshot';

// apollo
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_JOB_SERVER } from '../../../../../../../../../../graphql/queries/server/getJob';

const PendingChallenge = () => {

  // client
  const client = useApolloClient();
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

  // queries
  const { loading, error, data } = useQuery(GET_JOB_SERVER, { variables: { jobId: mission.selectedJob.id } })

  if (loading) return null
  if (error) return null

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