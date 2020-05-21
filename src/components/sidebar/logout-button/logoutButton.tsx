import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';
import { navigate } from '@reach/router';

const LogoutButton = () => {

  // client
  const client = useApolloClient();

  // handler
  function handleClick() {
    client.clearStore()
    localStorage.clear()
    navigate('http://localhost:3000')
  };


  return (
    <div>
      <p>
        <button onClick={handleClick}>LOGOUT</button>
      </p>
    </div>
  )
}

export default LogoutButton;