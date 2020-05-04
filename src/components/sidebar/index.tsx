import * as React from 'react';

import './styles.css';
import { Link } from '@reach/router';

const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      <Link to='missions/'>MISSIONS</Link>
      <Link to='settings/'>SETTINGS</Link>
    </div>
  )
}

export default Sidebar;