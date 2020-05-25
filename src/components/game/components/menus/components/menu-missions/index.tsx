import * as React from 'react';

// modules
import { Router } from '@reach/router';

// components
import ListMissions from './components/list-missions';
import NotFound from '../../../../../notFound';
import Mission from './components/mission';

// styles
import './styles.css'


const MenuMissions = ({ path }: any) => {

  return (
    <div className='menu-missions-router-container'>
      <Router>
        <ListMissions path='/' />
        <Mission path='/:missionId' />
        <NotFound default />
      </Router>
    </div>
  )
}

export default MenuMissions;