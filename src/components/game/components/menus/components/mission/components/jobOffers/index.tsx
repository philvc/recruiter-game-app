import * as React from 'react';

// modules
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

// components
import JobOffersTable from './components/table';
import { useQuery } from '@apollo/client';
import { GET_MISSION_ID_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionId';

const JobOffers = ({ path }: any) => {
  const { loading, error, data }: any = useQuery(GET_MISSION_ID_CLIENT)

  if (loading) return null
  if (error) return null

  console.log('missionId', data.missionId)
  return (
    <div>
      <h1>10 Job Offers Mission</h1>
      <DndProvider backend={Backend}>
        <JobOffersTable missionId={data.missionId} />
      </DndProvider>
    </div>
  )
}

export default JobOffers;