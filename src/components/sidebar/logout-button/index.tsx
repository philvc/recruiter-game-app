import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';
import { Link } from '@reach/router';

// styles
import './styles.css';

const LogoutButton = () => {

  // client
  const client = useApolloClient();

  // handler
  function handleClick() {
    client.clearStore()
    localStorage.clear()
  };


  return (
    <div className='logout-button-container'>
      <p>
        <Link to='/'>
          <button onClick={handleClick}>LOGOUT</button>
        </Link>
      </p>
    </div>
  )
}

export default LogoutButton;