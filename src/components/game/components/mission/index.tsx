import * as React from 'react';

// modules
import { Router } from '@reach/router';

// components
import JobOffers from './components/jobOffers';
import MissionList from './components/list';
import NotFound from '../../../notFound';

const Mission = ({ path, gameId }: any) => {
  return (
    <Router>
      <MissionList path='list' gameId={gameId} />
      <JobOffers path=':type/:missionId' gameId={gameId} />
      <NotFound default />
    </Router>
  )
}

export default Mission;