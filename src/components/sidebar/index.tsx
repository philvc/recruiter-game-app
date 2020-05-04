import * as React from 'react';

import './styles.css';
import { Link } from '@reach/router';

const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      <Link to='settings/'>SETTINGS</Link>
      <Link to='missions/'>MISSIONS</Link>
    </div>
  )
}

export default Sidebar;