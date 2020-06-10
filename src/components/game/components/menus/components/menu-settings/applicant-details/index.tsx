import * as React from 'react';

// modules
import { useApolloClient, useMutation } from '@apollo/client';

// components
import MessageHub from '../../../../../../message-hub';

// apollo
import { GET_GAME_CLIENT } from '../../../../../../../graphql/queries/client/getGameClient';
import { SEND_MESSAGE } from '../../../../../../../graphql/mutations/server/sendMessage';
import { GET_PLAYER_CLIENT } from '../../../../../../../graphql/queries/client/getPlayerClient';

const ApplicantDetails = () => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })

  const { applicant, recruiter } = game;

  // ref
  const ref = React.useRef((arg: any) => '')

  // mutations
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted({ sendMessage }) {
      if (sendMessage) {
        ref.current('Invitation sent')
      }
    }
  })

  // handlers
  function handleClick() {
    sendMessage({
      variables: {
        recipientId: applicant.id,
        subject: `Invitation to 10 Jobs Challenge !`,
        message: `<p>${recruiter.playerName || recruiter.email} wants to help you finding a new job, join him to play the 10 Jobs Challenge</p>`
      }
    })
  };


  return (
    <div>
      <h5>Applicant</h5>
      {player.id !== applicant.id ? (
        <div>
          <p>Player name: {applicant.playerName || 'not completed'}</p>
          <p>
            Email: {applicant.email}
            <button style={{ marginLeft: "10px" }} onClick={handleClick}>Resend invitation</button>
          </p>
        </div>
      )
        : <p>Me</p>

      }

      <MessageHub children={(add: any) => ref.current = add} />
    </div>
  )
};

export default ApplicantDetails;