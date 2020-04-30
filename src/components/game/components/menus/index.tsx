import * as React from 'react';

// modules
import { Router } from '@reach/router';

// components
import Mission from './components/mission';

const Menus = ({ path }: any) => {
  return (
    <Router>
      <Mission path='mission/*' />
    </Router>
  )
}

export default Menus; 