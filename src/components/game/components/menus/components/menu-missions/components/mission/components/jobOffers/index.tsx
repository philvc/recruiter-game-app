import * as React from 'react';

// modules
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

// components
import JobOffersTable from './components/table';
import { useApolloClient, gql } from '@apollo/client';
import { GET_MISSION_ID_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionId';

const JobOffers = () => {
  const client = useApolloClient()
  const { missionId }: any = client.readQuery({ query: GET_MISSION_ID_CLIENT })
  const { progress }: any = client.readFragment({
    id: `Mission:${missionId}`,
    fragment: gql`
      fragment myMission on Mission {
        progress
      }
    `
  })
  const [stateProgress, setStateProgress] = React.useState(progress)

  return (
    <div>
      <h1>10 Job Offers Mission</h1>
      <p>{`${stateProgress}/10`}</p>
      <DndProvider backend={Backend}>
        <JobOffersTable missionId={missionId} setStateProgress={setStateProgress} />
      </DndProvider>
    </div>
  )
}

export default JobOffers;