import * as React from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { GET_GAME_CLIENT } from '../../../../../../../graphql/queries/client/getGameClient';
import { SEND_MESSAGE } from '../../../../../../../graphql/mutations/server/sendMessage';
import MessageHub from '../../../../../../message-hub';

const ApplicantDetails = () => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

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
        subject: `${recruiter.email} invites you to his 10 Jobs Challenge !`,
        message: `${recruiter.playerName} wants to help you finding a new job, join him to play the 10 Jobs Challenge`
      }
    })
  };


  return (
    <div>
      <h5>Applicant</h5>
      <p>Player name: {applicant.playerName}</p>
      <p>Email: {applicant.email}</p>
      <button onClick={handleClick}>Resend invitation</button>
      <MessageHub children={(add: any) => ref.current = add} />
    </div>
  )
};

export default ApplicantDetails;