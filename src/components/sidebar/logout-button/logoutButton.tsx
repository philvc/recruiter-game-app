import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';
import { Link } from '@reach/router';

const LogoutButton = () => {

  // client
  const client = useApolloClient();

  // handler
  function handleClick() {
    client.clearStore()
    localStorage.clear()
  };


  return (
    <div>
      <p>
        <Link to='/'>
          <button onClick={handleClick}>LOGOUT</button>
        </Link>
      </p>
    </div>
  )
}

export default LogoutButton;