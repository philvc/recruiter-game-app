import * as React from 'react';

// apollo
import { useMutation } from '@apollo/client';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../../../../../../../../../graphql/mutations/server/updateJobServer';

const JobCheckboxInputField = ({ name, value, jobId }: any) => {

  // state
  const [state, setState] = React.useState(value)

  // mutations
  const [updateJob] = useMutation(UPDATE_JOB_SERVER)

  //helpers
  function handleChange(e: any) {
    setState(e.target.checked)
    updateJob({
      variables: {
        id: jobId,
        field: name,
        data: e.target.checked
      }
    })
  }

  return (
    <label>
      <input type='checkbox' name={name} checked={state} onChange={handleChange} />
    </label>
  )
}

export default JobCheckboxInputField;