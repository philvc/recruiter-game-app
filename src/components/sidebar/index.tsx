import * as React from 'react';

// modules
import { Link } from '@reach/router';

// styles
import './styles.css';

// components
import LogoutButton from './logout-button/logoutButton';


const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      <Link to='missions/'>MISSIONS</Link>
      <Link to='challenges/'>CHALLENGES</Link>
      <Link to='scoreboard/'>SCOREBOARD</Link>
      <Link to='settings/'>SETTINGS</Link>
      <LogoutButton />
    </div>
  )
}

export default Sidebar;