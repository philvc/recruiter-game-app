import * as React from 'react';

// modules
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { useApolloClient } from '@apollo/client';

// components
import List from './components/list-jobs';

// apollo
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';
import ReviewButton from '../../../../../../../../../review-button';

const Mission10JobOffers = () => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

  // state
  const [progress, setProgress] = React.useState(mission.progress)

  return (
    <div>
      <h1>10 Job Offers Mission</h1>
      <DndProvider backend={Backend}>
        {progress}/10
        {progress === 10 && !mission.isReviewed && <ReviewButton />}
        <List setProgress={setProgress} />
      </DndProvider>
    </div>
  )
}

export default Mission10JobOffers;