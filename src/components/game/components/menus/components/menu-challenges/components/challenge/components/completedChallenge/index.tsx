import * as React from 'react';

// modules
import { useApolloClient, useQuery } from '@apollo/client';

// apollo
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_JOB_SERVER } from '../../../../../../../../../../graphql/queries/server/getJob';

const CompletedChallenge = () => {

  // client
  const client = useApolloClient();
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

  // query
  const { loading, error, data } = useQuery(GET_JOB_SERVER, { variables: { jobId: mission.selectedJob.id } })

  if (loading) return null;
  if (error) return null;

  return (
    <div>
      <p>{mission.selectedJob.name}</p>
      <img src={data.job.applicationProofUrl} alt='application screenshot' />
    </div>
  )
}

export default CompletedChallenge;