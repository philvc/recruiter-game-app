import * as React from 'react';

// node_modules
import { Router } from '@reach/router';

// components
import ListGames from './components/list-games';
import NotFound from '../notFound';
import Menus from './components/menus';


const Game = ({ path }: any) => {
  return (
    <div>
      <Router>
        <ListGames path='/' />
        <Menus path=':gameTitle/*' />
        <NotFound default />
      </Router>
    </div>
  )
}

export default Game;