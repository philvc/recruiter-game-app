import * as React from 'react';

// modules
import { Router } from '@reach/router';

// components
import NotFound from '../../../../../notFound';
import ListChallenges from './components/list-challenges';
import Challenge from './components/challenge';

// graphql

const MenuChallenges = ({ path }: any) => {


  return (
    <Router>
      <ListChallenges path='/' />
      <Challenge path='/:challengeId' />
      <NotFound default />
    </Router>

  )
}

export default MenuChallenges;