import * as React from 'react';

// packages
import { useMutation } from '@apollo/react-hooks';

// mutations
import { ADDGAME_MUTATION } from '../../../../graphql/mutations';
import { GET_GAMES } from '../../../../graphql/queries';

// context
import { PlayerContext } from '../../../../App.ctx';

const AddGame = ({ navigate }: any) => {
  const { playerContext } = React.useContext(PlayerContext)

  const [addGameMutation, { data, loading, error }] = useMutation(ADDGAME_MUTATION, {
    update(cache, { data: { addGame } }) {
      const { games }: any = cache.readQuery({ query: GET_GAMES, variables: { id: playerContext.id } });
      cache.writeQuery({
        query: GET_GAMES,
        variables: { id: playerContext.id },
        data: { games: games.concat([addGame]) }
      })
    }
  })

  function handleClick() {
    addGameMutation({ variables: { title: 'game 7' } })
  }

  // if (data) {
  //   console.log('addgame data :', data.addGameMutation.title)
  //   // navigate(`/${data.addGameMutation.id}/:playerType/mission`)
  // }

  return (
    <div>
      <button onClick={handleClick}>Start new recruiter game</button>
    </div>
  )
}

export default AddGame;