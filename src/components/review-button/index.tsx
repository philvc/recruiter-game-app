import * as React from 'react';

// modules
import { navigate } from '@reach/router';
import { useMutation, useApolloClient } from '@apollo/client';

// components
import Message from '../message';

// styles
import './styles.css';

// apollo
import { GET_MISSION_CLIENT } from '../../graphql/queries/client/getMissionClient';
import { GET_GAME_CLIENT } from '../../graphql/queries/client/getGameClient';
import { UPDATE_MISSION_V2 } from '../../graphql/mutations/server/updateMissionV2';
import { SEND_MESSAGE } from '../../graphql/mutations/server/sendMessage';
import { GET_MISSIONS_CLIENT } from '../../graphql/queries/client/getMissionsClient';


const ReviewButton = () => {

  // client 
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // state
  const [message, setMessage] = React.useState('')


  // mutations
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2, {
    onCompleted({ updateMissionV2 }) {

      client.writeQuery({
        query: GET_MISSION_CLIENT,
        data: {
          mission: updateMissionV2,
        }
      })

      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })

      localStorage.setItem('missions', JSON.stringify(missions))
      localStorage.setItem('mission', JSON.stringify(updateMissionV2))
      navigate(`/games/${game.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('')}/missions`)
    }
  })
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


  }

  return (
    <div className='review-container'>
      <Message message={message} setMessage={setMessage} context='Nice you have completed the table ! Now, lets ask your applicant to score your mission: ' />
      <button className='review-button' onClick={handleClick}>Send</button>
    </div>
  )
};

export default ReviewButton;