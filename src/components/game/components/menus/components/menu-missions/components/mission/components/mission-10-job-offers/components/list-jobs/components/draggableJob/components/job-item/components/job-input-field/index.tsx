import * as React from 'react';

import { actions } from '../../reducer'

// components
import MessageHub from '../../../../../../../../../../../../../../../../../message-hub';

// styles
import { StyledTenJobsInput } from './styles';

// apollo
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../../../../../../../../../graphql/mutations/server/updateJobServer';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../../../../../../../../../../../graphql/queries/client/getJobsByGameIdClient';
import { GET_GAME_CLIENT } from '../../../../../../../../../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_PLAYER_CLIENT } from '../../../../../../../../../../../../../../../../../../graphql/queries/client/getPlayerClient';

const JobInputField = ({ name, value, jobId, dispatch }: any) => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })

  // state
  const [state, setState] = React.useState(value)

  const ref = React.useRef((arg: any) => '')

  // mutation
  const [updateJob] = useMutation(UPDATE_JOB_SERVER, {
    onCompleted({ updateJob }) {

      // update client
      client.writeFragment({
        id: `Job:${updateJob.id}`,
        fragment: gql`
          fragment UrlAndName on Job {
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

  // handlers
  function handleChange(e: any) {
    setState(e.target.value)
    updateJob({
      variables: {
        id: jobId,
        field: name,
        data: e.target.value
      }
    })

    dispatch({ type: e.target.name === 'name' ? actions.isNameComplete : actions.isUrlComplete, payload: e.target.value })
  }

  function handleClick(e: any) {
    if (player.id === game.applicant.id) {
      navigator.clipboard.writeText(e.target.value)
      ref.current('copied to your clipboard')
    }
  }

  return (
    <td>
      <label>
        <StyledTenJobsInput
          type={name}
          name={name}
          value={mission?.isUnderReview ? value : state}
          onClick={handleClick}
          onChange={handleChange}
          disabled={game.applicant.id === player.id && !mission?.isUnderReview}
          isApplicant={player.id === game.applicant.id}
        />
      </label>
      <MessageHub children={(add: any) => ref.current = add} />
    </td>
  )
}

export default JobInputField;