import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// component
import ReviewButton from './components/review-button';

// apollo
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';


const ListProgress = () => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })


  return (
    <div>
      <p>{mission.progress || 0}/10 <span>{mission.progress === 10 ? 'list completed' : null}</span></p>
      {mission.progress === 10 && !mission.isReviewed && < ReviewButton />}
    </div>
  )
}

export default ListProgress;