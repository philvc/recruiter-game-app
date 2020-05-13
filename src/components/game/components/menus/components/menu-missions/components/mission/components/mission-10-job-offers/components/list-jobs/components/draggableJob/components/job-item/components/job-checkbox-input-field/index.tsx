import * as React from 'react';

// apollo
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../../../../../../../../../graphql/mutations/server/updateJobServer';
import { GET_ACCEPTED_JOBS_SERVER } from '../../../../../../../../../../../../../../../../../../graphql/queries/server/getAcceptedJobs';
import { GET_GAME_CLIENT } from '../../../../../../../../../../../../../../../../../../graphql/queries/client/getGameClient';

const JobCheckboxInputField = ({ name, value, jobId }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // state
  const [state, setState] = React.useState(value)

  // mutations
  const [updateJob] = useMutation(UPDATE_JOB_SERVER, {
    onCompleted({ updateJob }) {
      if (updateJob.isAccepted && localStorage.hasOwnProperty('acceptedJobs')) {

        const { acceptedJobs }: any = client.readQuery({ query: GET_ACCEPTED_JOBS_SERVER, variables: { gameId: game.id } })

        const newAcceptedJobs = acceptedJobs.concat([updateJob])

        client.writeQuery({
          query: GET_ACCEPTED_JOBS_SERVER,
          variables: {
            gameId: game.id
          },
          data: { acceptedJobs: newAcceptedJobs }
        })

        localStorage.setItem('acceptedJobs', JSON.stringify(newAcceptedJobs))
      }
    }
  })

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