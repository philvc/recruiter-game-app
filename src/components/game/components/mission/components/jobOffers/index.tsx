import * as React from 'react';

// modules
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

// components
import JobOffersTable from './components/table';

const JobOffers = ({ path, missionId }: any) => {
  return (
    <div>
      <h1>10 Job Offers Mission</h1>
      <DndProvider backend={Backend}>
        <JobOffersTable missionId={missionId} />
      </DndProvider>
    </div>
  )
}

export default JobOffers;