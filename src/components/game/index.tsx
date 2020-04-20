import * as React from 'react';

// node_modules
import { Router } from '@reach/router';

// components
import JobOffers from './components/jobOffers';

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
        <JobOffers path='10jobs/:id' />
      </Router>
    </div>
  )
}

export default Game;