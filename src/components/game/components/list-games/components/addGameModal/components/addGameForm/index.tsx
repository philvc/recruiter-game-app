import * as React from 'react';

// packages
import { navigate } from '@reach/router';

// style
import './style.css';

// reducer
import { formReducer, initialState, actions } from './reducer';

// grapqhql
import { useMutation, useApolloClient, } from '@apollo/client';
import { ADDGAME_SERVER } from '../../../../../../../../graphql/mutations/server/addGameServer';
import { GET_PLAYER_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerClient';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../graphql/queries/client/getJobsByGameIdClient';


const AddGameForm = ({ openModal }: any) => {

  // client
  const client = useApolloClient()

  // state
  const [state, dispatch] = React.useReducer(formReducer, initialState);

  // queries
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT });

  // mutations
  const [addGameMutation] = useMutation(ADDGAME_SERVER, {

    update(cache, { data: { addGame } }) {

      // update client
      const { games }: any = cache.readQuery({ query: GET_PLAYERANDGAMES_CLIENT });
      const newGames = games.concat([addGame])
      cache.writeQuery({
        query: GET_PLAYERANDGAMES_CLIENT,
        data: {
          gameId: addGame.id,
          games: newGames,
          game: addGame,
        }
      })

      client.writeQuery({
        query: GET_JOBS_BY_GAME_ID_CLIENT,
        variables: { gameId: addGame.id },
        data: {
          getJobsByGameId: null
        }
      })

      // update storage
      localStorage.setItem('games', JSON.stringify(newGames))
      localStorage.setItem('game', JSON.stringify(addGame))
    },
    onCompleted({ addGame }) {
      navigate(`/games/${addGame.title.split(" ").join('')}/missions`)
    }
  })

  // effects
  React.useEffect(() => {
    if (state.status === 'completed') {
      addGameMutation({ variables: { title: state.title, recruiterId: player.id, email: state.email, name: state.name } })
    }
  }, [state, addGameMutation, player.id])

  // handlers
  function handleChange(e: any) {
    dispatch({ type: `${e.target.name}Changed`, payload: e.target.value })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    dispatch({ type: actions.formSubmitted })
  }

  const inputStyle = (hasError: any) => {
    return {
      outline: hasError && state.formSubmitted ? '2px solid red' : 'none',
    }
  }
  return (
    <div className='add-game-form-container'>
      <form style={{ width: '300px' }} onSubmit={handleSubmit}>
        <h4>New Game</h4>
        <label>
          <span>Title: </span>
          <input
            style={inputStyle(state.titleError)}
            id='title'
            onChange={handleChange}
            name="title"
            value={state.title}
            type="text"
          />
          <span>{state.submitAttempted && state.nameError}</span>
        </label>
        <p>Invite your friend</p>
        <label>
          <span>Email: </span>
          <input
            style={inputStyle(state.emailError)}
            onChange={handleChange}
            name="email"
            value={state.email}
            type="text"
          />
        </label>
        <label>
          <span>Name: </span>
          <input
            style={inputStyle(state.nameError)}
            onChange={handleChange}
            name="name"
            value={state.name}
            type="text"
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={openModal}>Cancel</button>
        <span>{state.submitAttempted && state.emailError}</span>
        <p>{state.submitMessage}</p>
      </form>

    </div>
  )
}

export default AddGameForm