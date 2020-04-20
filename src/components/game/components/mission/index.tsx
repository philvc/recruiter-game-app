import * as React from 'react';

// modules
import { Router } from '@reach/router';

// components
import JobOffers from './components/jobOffers';
import MissionList from './components/list';

const Mission = ({ path }: any) => {
  return (
    <Router>
      <MissionList path='/' />
      <JobOffers path='/10jobs/:id' />
    </Router>
  )
}

export default Mission;