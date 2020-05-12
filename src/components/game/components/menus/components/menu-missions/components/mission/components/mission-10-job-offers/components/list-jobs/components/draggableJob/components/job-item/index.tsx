import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// components
import JobInputField from './components/job-input-field';
import JobCheckboxInputField from './components/job-checkbox-input-field';

// apollo
import { GET_GAME_CLIENT } from '../../../../../../../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_PLAYER_CLIENT } from '../../../../../../../../../../../../../../../../graphql/queries/client/getPlayerClient';

const JobItem = ({ job, index }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })

  return (
    <div>
      <span>{index + 1}</span>
      <span>{job.id}</span>
      <JobInputField name='url' value={job.url} jobId={job.id} />
      <JobInputField name='name' value={job.name} jobId={job.id} />
      {player.id === game.applicantId && <JobCheckboxInputField name='isAccepted' value={job.isAccepted} jobId={job.id} />}
    </div>
  );
}

export default JobItem;