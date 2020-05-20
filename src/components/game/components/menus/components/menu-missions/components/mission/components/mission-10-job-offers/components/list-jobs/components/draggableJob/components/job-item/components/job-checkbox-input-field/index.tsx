import * as React from 'react';

// apollo
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../../../../../../../../../graphql/mutations/server/updateJobServer';
import { GET_GAME_CLIENT } from '../../../../../../../../../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../../../../../../../../../../../graphql/queries/client/getJobsByGameIdClient';

const JobCheckboxInputField = ({ name, value, jobId }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // state
  const [state, setState] = React.useState(value)

  // mutations
  const [updateJob] = useMutation(UPDATE_JOB_SERVER, {
    onCompleted({ updateJob }) {
      // update client
      client.writeFragment({
        id: `Job:${updateJob.id}`,
        fragment: gql`
          fragment isAccepted on Job {
            isAccepted
          }
        `,
        data: {
          isAccepted: updateJob.isAccepted,
        }
      })

      // update storage
      const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })
      localStorage.setItem('jobs', JSON.stringify(getJobsByGameId))
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