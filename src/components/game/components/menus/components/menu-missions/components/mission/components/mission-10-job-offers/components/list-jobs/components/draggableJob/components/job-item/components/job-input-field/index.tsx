import * as React from 'react';

// apollo
import { useMutation } from '@apollo/client';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../../../../../../../../../graphql/mutations/server/updateJobServer';

const JobInputField = ({ name, value, jobId }: any) => {

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
      <input type={name} name={name} value={state} onChange={handleChange} />
    </label>
  )
}

export default JobInputField;