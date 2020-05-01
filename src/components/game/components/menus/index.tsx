import * as React from 'react';

// modules
import { Router, Redirect } from '@reach/router';

// components
import MenuMissions from './components/menu-missions';

const Menus = ({ path }: any) => {
  return (
    <Router>
      <MenuMissions path='mission/*' />
      <Redirect from='/' to='mission' noThrow />
    </Router>
  )
}

export default Menus; 