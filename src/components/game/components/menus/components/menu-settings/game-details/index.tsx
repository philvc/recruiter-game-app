import * as React from 'react';

// modules
import { useApolloClient, useMutation } from '@apollo/client';

// apollo
import { GET_GAME_CLIENT } from '../../../../../../../graphql/queries/client/getGameClient';
import { UPDATE_GAME_SERVER } from '../../../../../../../graphql/mutations/server/updateGameServer';

const GameDetails = () => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // state
  const [title, setTitle] = React.useState(game.title)

  // mutations
  const [updateGame] = useMutation(UPDATE_GAME_SERVER, {
    onCompleted({ updateGame }) {
      localStorage.setItem('game', JSON.stringify(updateGame))
    }
  })

  // handlers
  function handleChange(e: any) {
    setTitle(e.target.value)
  }

  function handleClick(e: any) {
    updateGame({
      variables: {
        id: game.id,
        field: 'title',
        data: title,
      }
    })
  }

  return (
    <div>
      <h5>Game</h5>
      <p>
        <label>
          Title:<span> </span>
          <input type='text' name='title' value={title} onChange={handleChange} />
        </label>
        <button style={{ marginLeft: "10px" }} onClick={handleClick}>Update</button>
      </p>
    </div>
  )
}

export default GameDetails;