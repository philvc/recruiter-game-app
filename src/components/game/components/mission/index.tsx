import * as React from 'react';

// modules
import { Router } from '@reach/router';

// components
import JobOffers from './components/jobOffers';
import MissionList from './components/list';

const Mission = ({ path, gameId }: any) => {
  return (
    <Router>
      <MissionList path='/' gameId={gameId} />
      <JobOffers path='/10jobs/:id' gameId={gameId} />
    </Router>
  )
}

export default Mission;