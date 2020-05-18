import * as React from 'react';

// apollo
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../../../../../../../../../graphql/mutations/server/updateJobServer';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../../../../../../../../../../../graphql/queries/client/getJobsByGameIdClient';
import { GET_GAME_CLIENT } from '../../../../../../../../../../../../../../../../../../graphql/queries/client/getGameClient';

const JobInputField = ({ name, value, jobId }: any) => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // state
  const [state, setState] = React.useState(value)

  // mutation
  const [updateJob] = useMutation(UPDATE_JOB_SERVER, {
    onCompleted({ updateJob }) {

      // update client
      client.writeFragment({
        id: `Job:${updateJob.id}`,
        fragment: gql`
          fragment MyJob on Job {
            url
            name
          }
        `,
        data: {
          url: updateJob.url,
          name: updateJob.name,
        }
      })

      // update storage
      const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })
      localStorage.setItem('jobs', JSON.stringify(getJobsByGameId))
    }
  })

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