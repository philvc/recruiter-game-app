import * as React from 'react';

// modules
import { Router } from '@reach/router';

// components
import ListMissions from './components/list-missions';
import NotFound from '../../../../../notFound';
import Mission from './components/mission';


const MenuMissions = ({ path }: any) => {

  return (
    <Router>
      <ListMissions path='/' />
      <Mission path='/:missionId' />
      <NotFound default />
    </Router>
  )
}

export default MenuMissions;