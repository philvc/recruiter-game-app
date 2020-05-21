import * as React from 'react';

// modules
import { useApolloClient, useMutation } from '@apollo/client';

// styles
import './styles.css';

// apollo
import { GET_PLAYER_CLIENT } from '../../../../../../../graphql/queries/client/getPlayerClient';
import { UPDATE_PLAYER_SERVER } from '../../../../../../../graphql/mutations/server/updatePlayer';
import MessageHub from '../../../../../../message-hub';

const Profile = () => {

  // client
  const client = useApolloClient()
  const { player }: any = client.readQuery({
    query: GET_PLAYER_CLIENT,

  })

  // state
  const [email, setEmail] = React.useState(player.email)
  const [playerName, setPlayerName] = React.useState(player.playerName)

  const ref = React.useRef((arg: any) => '')

  // mutations
  const [updatePlayer] = useMutation(UPDATE_PLAYER_SERVER, {
    onCompleted({ updatePlayer }) {
      const { player } = updatePlayer;
      client.writeQuery({
        query: GET_PLAYER_CLIENT,
        data: {
          player: {
            id: player.id,
            email: player.email,
            playerName: player.playerName,
            __typename: 'Player'
          }
        }
      })
      ref.current('Your profile is updated')

      localStorage.setItem('player', JSON.stringify(player))
    }
  })


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
      <div className='edit-information-container'>
        <h5>My Profile</h5>
        <label>
          Email
        <input type='email' name='email' value={email} onChange={handleChange} />
        </label>
        <label>
          Player name
          <input type='text' name='playerName' value={playerName} onChange={handleChange} />
        </label>
        <button onClick={handleClick}>UPDATE</button>
        <MessageHub children={(add: any) => ref.current = add} />
      </div>
    </div>
  )

}

export default Profile;