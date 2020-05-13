import * as React from 'react';

// helpers
import { calculateCountDown } from './helper'
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_MISSION_V2 } from '../../../../../../../../../../graphql/mutations/server/updateMissionV2';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';
import { SEND_MESSAGE } from '../../../../../../../../../../graphql/mutations/server/sendMessage';
import { GET_GAME_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameClient';
import { navigate } from '@reach/router';

const Countdown = ({ missionTime }: any) => {

  // client 
  const client = useApolloClient();
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // state
  const [countdown, setCountDown] = React.useState('');

  // mutations
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2)
  const [sendMessage] = useMutation(SEND_MESSAGE)

  if (countdown !== 'EXPIRED') {
    calculateCountDown(parseInt(missionTime, 10), setCountDown)
  }

  if (countdown === 'EXPIRED' && mission.status === 'pending') {
    // update mission completed & send message
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

    navigate(`/games/${game.title.split(" ").join('')}/challenges`)

  }

  return (
    <span>{countdown}</span>
  )
}

export default Countdown;