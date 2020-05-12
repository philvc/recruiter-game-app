import * as React from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_MISSION_V2 } from '../../../../../../../../../../../../../../../../graphql/mutations/server/updateMissionV2';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';
import Message from '../../../../../../../../../../../../../../../message';

const ReviewButton = () => {

  // client 
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

  // state
  const [message, setMessage] = React.useState('')

  // mutations
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2)

  // helpers
  function handleClick(e: any) {
    updateMissionV2({
      variables: {
        id: mission.id,
        field: 'isReviewed',
        data: true
      }
    })
  }

  return (
    <div>
      <Message message={message} setMessage={setMessage} />
      <button onClick={handleClick}>Push for review</button>
    </div>
  )
};

export default ReviewButton;