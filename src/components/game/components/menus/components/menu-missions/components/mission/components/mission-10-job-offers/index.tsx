import * as React from 'react';

// modules
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

// components
import List from './components/list-jobs';

const Mission10JobOffers = () => {

  return (
    <div>
      <h1>10 Job Offers Mission</h1>
      <DndProvider backend={Backend}>
        <List />
      </DndProvider>
    </div>
  )
}

export default Mission10JobOffers;