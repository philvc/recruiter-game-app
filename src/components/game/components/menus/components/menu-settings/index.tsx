import * as React from 'react';
import NavBar from '../../../../../navbar';
import './styles.css'
import { useApolloClient } from '@apollo/client';
import { GET_PLAYER_CLIENT } from '../../../../../../graphql/queries/client/getPlayerClient';
const Settings = ({ path }: any) => {
  const client = useApolloClient()
  const { player }: any = client.readQuery({
    query: GET_PLAYER_CLIENT,

  })

  const [email, setEmail] = React.useState(player.email)

  function handleChange(event: any) {
    switch (event?.target.name) {
      case 'email':
        return setEmail(event.target.value)
      // case 'playerName':
      //   return setPlayerName(event.target.value);
      default:
        return null
    }
  }

  return (
    <div>
      <NavBar />
      <div className='edit-information-container'>
        <label>
          Email
        <input type='email' name='email' value={email} onChange={handleChange} />
        </label>
        <label>
          Player name
          <input type='text' name='playerName' />
        </label>
        <button>UPDATE</button>
      </div>
    </div>
  )
}

export default Settings;