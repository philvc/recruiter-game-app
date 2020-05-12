import * as React from 'react';

// apollo
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../../../../../../../../../graphql/mutations/server/updateJobServer';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';

const JobInputField = ({ name, value, jobId }: any) => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

  // state
  const [state, setState] = React.useState(value)

  // mutation
  const [updateJob] = useMutation(UPDATE_JOB_SERVER)

  // helpers
  function handleChange(e: any) {
    setState(e.target.value)
    updateJob({
      variables: {
        id: jobId,
        field: name,
        data: e.target.value
      }
    })
  }

  return (
    <label>
      <input type={name} name={name} value={state} onChange={handleChange} disabled={mission?.isReviewed} />
    </label>
  )
}

export default JobInputField;