import * as React from 'react';

// modules
import { Router, Redirect } from '@reach/router';

// components
import MenuMissions from './components/menu-missions';
import Settings from './components/menu-settings';
import Sidebar from '../../../sidebar';
import MenuChallenges from './components/menu-challenges';

// style
import './styles.css';
import MenuScoreboard from './components/menu-scoreboard';
import MenuNotification from './components/menu-notifications';

const Menus = ({ path }: any) => {
  return (
    <div className='menus-container'>
      <Sidebar />
      <div className='menus-container-router'>
        <Router>
          <MenuMissions path='missions/*' />
          <MenuChallenges path='challenges/*' />
          <MenuScoreboard path='scoreboard/*' />
          <Settings path='settings/*' />
          <Redirect from='/' to='missions' noThrow />
        </Router>
      </div>
      <MenuNotification />
    </div>
  )
}

export default Menus; 