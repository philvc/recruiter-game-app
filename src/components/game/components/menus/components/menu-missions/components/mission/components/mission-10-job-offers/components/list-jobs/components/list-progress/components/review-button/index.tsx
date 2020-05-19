import * as React from 'react';

// modules
import { navigate } from '@reach/router';

// components
import Message from '../../../../../../../../../../../../../../../message';

// apollo
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_MISSION_V2 } from '../../../../../../../../../../../../../../../../graphql/mutations/server/updateMissionV2';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';
import { SEND_MESSAGE } from '../../../../../../../../../../../../../../../../graphql/mutations/server/sendMessage';
import { GET_GAME_CLIENT } from '../../../../../../../../../../../../../../../../graphql/queries/client/getGameClient';

const ReviewButton = () => {

  // client 
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  // state
  const [message, setMessage] = React.useState('')

  // mutations
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2)
  const [sendMessage] = useMutation(SEND_MESSAGE)

  // handlers
  function handleClick(e: any) {
    // update mission
    updateMissionV2({
      variables: {
        id: mission.id,
        field: 'isReviewed',
        data: true
      }
    })
    // send message to applicant
    sendMessage({
      variables: {
        recipientId: game.applicantId,
        subject: 'Your friend is asking you to review his mission',
        message,
      }
    })

    navigate(`/games/${game.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('')}/missions`)

  }

  return (
    <div>
      <Message message={message} setMessage={setMessage} />
      <button onClick={handleClick}>Push for review</button>
    </div>
  )
};

export default ReviewButton;