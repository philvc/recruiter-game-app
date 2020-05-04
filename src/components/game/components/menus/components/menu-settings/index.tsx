import * as React from 'react';
import NavBar from '../../../../../navbar';
import './styles.css'
import { useApolloClient, useMutation } from '@apollo/client';
import { GET_PLAYER_CLIENT } from '../../../../../../graphql/queries/client/getPlayerClient';
import { UPDATE_PLAYER_SERVER } from '../../../../../../graphql/mutations/server/updatePlayer';
const Settings = ({ path }: any) => {
  const client = useApolloClient()
  const { player }: any = client.readQuery({
    query: GET_PLAYER_CLIENT,

  })
  const [updatePlayer] = useMutation(UPDATE_PLAYER_SERVER, {
    onCompleted({ updatePlayer }) {
      const { player } = updatePlayer;
      client.writeQuery({
        query: GET_PLAYER_CLIENT,
        data: {
          player: {
            id: player.id,
            email: player.email,
            playerName: player.playerName
          }
        }
      })
      localStorage.setItem('player', JSON.stringify(player))
    }
  })

  const [email, setEmail] = React.useState(player.email)
  const [playerName, setPlayerName] = React.useState(player.playerName)

  function handleChange(event: any) {
    switch (event?.target.name) {
      case 'email':
        return setEmail(event.target.value)
      case 'playerName':
        return setPlayerName(event.target.value);
      default:
        return null
    }
  }

  function handleClick() {
    updatePlayer({
      variables: {
        id: player.id,
        email,
        playerName,
      }
    })
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
          <input type='text' name='playerName' value={playerName} onChange={handleChange} />
        </label>
        <button onClick={handleClick}>UPDATE</button>
      </div>
    </div>
  )
}

export default Settings;