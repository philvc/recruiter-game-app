import * as React from 'react';

// node_modules
import { Router } from '@reach/router';

// components
import Select from './components/select';
import Dashboard from './components/dashboard';
import Mission from './components/mission';
import NotFound from '../notFound';

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
        <Dashboard path='/game/:gameId' />
        <Select path='/select' />
        <Mission path='/game/:gameId/mission/*' />
        <NotFound default />
      </Router>
    </div>
  )
}

export default Game;