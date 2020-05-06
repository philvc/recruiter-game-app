import * as React from 'react';
import Scoreboard from './components/scoreboard';
import { Router } from '@reach/router';

const MenuScoreboard = ({ path }: any) => {
  return (
    <Router>
      <Scoreboard path='/' />
    </Router>
  )
}

export default MenuScoreboard;