import * as React from 'react';

// node_modules
import { Router } from '@reach/router';

// components
import SelectGame from '../selectGame';
import Dashboard from './components/dashboard';
import Mission from './components/mission';

const Game = ({ path }: any) => {
  return (
    <div>
      {/* sidebar avec des liens */}
      {/* page dashboard
      page Mission
      page mission 10 jobs
      pages settings
      ... */}
      <Router>
        <Dashboard path='/:gameTitle' />
        <SelectGame path='/select' />
        <Mission path='/:gameTitle/mission/*' />
      </Router>
    </div>
  )
}

export default Game;