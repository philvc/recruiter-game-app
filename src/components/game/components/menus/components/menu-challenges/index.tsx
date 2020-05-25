import * as React from 'react';

// modules
import { Router } from '@reach/router';

// components
import NotFound from '../../../../../notFound';
import ListChallenges from './components/list-challenges';
import Challenge from './components/challenge';

// styles
import './styles.css';

const MenuChallenges = ({ path }: any) => {


  return (
    <div className="menu-challenges-router-container">
      <Router>
        <ListChallenges path='/' navigate />
        <Challenge path='/:challengeId' />
        <NotFound default />
      </Router>
    </div>

  )
}

export default MenuChallenges;