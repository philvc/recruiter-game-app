import * as React from 'react';

// modules
import { useMutation, useApolloClient } from '@apollo/client';
import { navigate } from '@reach/router';

// helpers
import { calculateCountDown } from './helper'

// apollo
import { UPDATE_MISSION_V2 } from '../../../../../../../../../../graphql/mutations/server/updateMissionV2';
import { SEND_MESSAGE } from '../../../../../../../../../../graphql/mutations/server/sendMessage';
import { GET_GAME_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameClient';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../graphql/mutations/server/updateJobServer';

const Countdown = ({ mission }: any) => {

  // client 
  const client = useApolloClient();
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // state
  const [countdown, setCountDown] = React.useState('');

  // mutations
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2, {
    onCompleted({ updateMissionV2 }) {
      // navigate problem
      navigate(`/games/${game.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('')}/challenges`)
      localStorage.setItem('mission', JSON.stringify(updateMissionV2))
    }
  })
  const [sendMessage] = useMutation(SEND_MESSAGE)
  const [updateJob] = useMutation(UPDATE_JOB_SERVER)

  if (countdown !== 'EXPIRED') {
    calculateCountDown(parseInt(mission.time, 10), setCountDown)
  }

  if (countdown === 'EXPIRED' && mission.status === 'pending') {

    updateJob(
      {
        variables: {
          id: mission.selectedJob.id,
          field: 'isSelected',
          data: false
        }
      })

    updateMissionV2({
      variables: {
        id: mission.id,
        field: 'status',
        data: 'completed',
      }
    })

    sendMessage({
      variables: {
        recipientId: game.applicantId,
        subject: 'You missed the deadline for your challenge',
        message: 'Sorry you missed the deadline and failed the challenged',
      }
    })

  }

  return (
    <span>{countdown}</span>
  )
}

export default Countdown;