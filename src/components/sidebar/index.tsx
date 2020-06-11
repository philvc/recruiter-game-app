import * as React from 'react';

// modules
import { Link } from '@reach/router';

// styles
import './styles.css';

// components
import LogoutButton from './logout-button';


const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      <Link
        to='lists/'
        getProps={() => {
          return {
            style: {
              color: "black",
              textDecoration: "none",
              marginBottom: "30px",
            }
          };
        }}
      >
        Job lists
      </Link>
      <Link
        to='applications/'
        getProps={() => {
          return {
            style: {
              color: "black",
              textDecoration: "none",
              marginBottom: "30px",
            }
          };
        }}
      >
        Job applications
      </Link>
      <Link
        to='scoreboard/'
        getProps={() => {
          return {
            style: {
              color: "black",
              textDecoration: "none",
              marginBottom: "30px",
            }
          };
        }}
      >
        Scoreboard
      </Link>
      <Link
        to='settings/'
        getProps={() => {
          return {
            style: {
              color: "black",
              textDecoration: "none",
              marginBottom: "30px",
            }
          };
        }}
      >
        Settings
        </Link>
      <LogoutButton />
    </div>
  )
}

export default Sidebar;