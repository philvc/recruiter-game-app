import * as React from 'react';

// packages
import { navigate } from '@reach/router';

// grapqhql
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADDGAME_SERVER } from '../../../../../../graphql/mutations/server/addGameServer';
import { GET_PLAYER } from '../../../../../../graphql/queries/client/getPlayerClient';

// reducer
import { formReducer, initialState, actions } from './reducer';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../graphql/queries/client/getPlayerAndGamesClient';

const AddGameForm = ({ openModal }: any) => {
  // Attributes
  const [state, dispatch] = React.useReducer(formReducer, initialState);
  const { data } = useQuery(GET_PLAYER)

  console.log('state :', state)

  const [addGameMutation] = useMutation(ADDGAME_SERVER, {
    update(cache, { data: { addGame } }) {
      console.log('addgma object :', addGame)
      const { games }: any = cache.readQuery({ query: GET_PLAYERANDGAMES_CLIENT });
      cache.writeQuery({
        query: GET_PLAYERANDGAMES_CLIENT,
        data: { games: games.concat([addGame]) }
      })
    },
    onCompleted({ addGame }) {
      localStorage.setItem('gameId', addGame.id)
      navigate(`/${data.firstName}/${addGame.title}/mission`)
    }
  })

  React.useEffect(() => {
    if (state.status === 'completed') {
      addGameMutation({ variables: { title: state.title, recruiterId: data.id, email: state.email } })
    }
  }, [state, addGameMutation, data.id])

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
    <div>
      <form style={{ width: '300px' }} onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            style={inputStyle(state.titleError)}
            id='title'
            onChange={handleChange}
            name="title"
            value={state.name}
            type="text"
          />
          <span>{state.submitAttempted && state.nameError}</span>
        </label>
        {/* <label>
          <span>email:</span>
          <input
            style={inputStyle(state.emailError)}
            onChange={handleChange}
            name="email"
            value={state.email}
            type="text"
          />
          <span>{state.submitAttempted && state.emailError}</span>
        </label> */}
        <p>{state.submitMessage}</p>
        <button type="submit">Save</button>
        <button type="button" onClick={openModal}>Cancel</button>
      </form>

    </div>
  )
}

export default AddGameForm