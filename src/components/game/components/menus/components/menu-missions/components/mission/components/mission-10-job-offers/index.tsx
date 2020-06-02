import * as React from 'react';

// modules
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { useApolloClient } from '@apollo/client';

// components
import List from './components/list-jobs';
import ReviewButton from '../../../../../../../../../review-button';
import SaveResultButton from './components/list-jobs/components/save-result-button';

// styles
import './styles.css';

// apollo
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_PLAYER_CLIENT } from '../../../../../../../../../../graphql/queries/client/getPlayerClient';
import { GET_GAME_CLIENT } from '../../../../../../../../../../graphql/queries/client/getGameClient';

const Mission10JobOffers = () => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })


  // state
  const [progress, setProgress] = React.useState(mission.progress)

  return (
    <div className='tenJobs-mission-body'>
      <h3 className='tenJobs-mission-title'>10 Job Offers</h3>
      <DndProvider backend={Backend}>
        <div className='tenJobs-mission-progress'>Progress: {progress}/10</div>
        {progress === 10 && !mission.isUnderReview && <ReviewButton />}
        <List setProgress={setProgress} />
        {player.id === game.applicantId && mission.isUnderReview && <SaveResultButton />}
      </DndProvider>
    </div>
  )
}

export default Mission10JobOffers;