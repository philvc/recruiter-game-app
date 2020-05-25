import * as React from 'react';

// modules
import { Router } from '@reach/router';

// components
import Scoreboard from './components/scoreboard';

// styles
import './styles.css';

const MenuScoreboard = ({ path }: any) => {
  return (
    <div className='menu-scoreboard-router-container'>
      <Router>
        <Scoreboard path='/' />
      </Router>
    </div>
  )
}

export default MenuScoreboard;