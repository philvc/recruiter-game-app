import * as React from 'react';

// packages
import { navigate } from '@reach/router';
import { useMutation, useApolloClient, } from '@apollo/client';


// style
import './style.css';

// component

// reducer
import { formReducer, initialState, actions } from './reducer';

// grapqhql
import { ADDGAME_SERVER } from '../../../../../../../../graphql/mutations/server/addGameServer';
import { GET_PLAYER_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerClient';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../graphql/queries/client/getJobsByGameIdClient';
import { GET_GAME_CLIENT } from '../../../../../../../../graphql/queries/client/getGameClient';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionsClient';
import { SEND_MESSAGE } from '../../../../../../../../graphql/mutations/server/sendMessage';
import { GET_GAMES_CLIENT } from '../../../../../../../../graphql/queries/client/getGamesClient';


const AddGameForm = ({ openModal }: any) => {

  // client
  const client = useApolloClient()

  // state
  const [state, dispatch] = React.useReducer(formReducer, initialState);


  // queries
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT });

  // mutations
  const [sendMessage] = useMutation(SEND_MESSAGE)
  const [addGameMutation] = useMutation(ADDGAME_SERVER, {

    update(cache, { data: { addGame } }) {

      // update client
      const { games }: any = cache.readQuery({ query: GET_GAMES_CLIENT, variables: { playerId: player.id } });
      const newGames = games.concat([addGame])
      cache.writeQuery({
        query: GET_GAMES_CLIENT,
        variables: {
          playerId: player.id,
        },
        data: {
          games: newGames,
        }
      })

      client.writeQuery({
        query: GET_GAME_CLIENT,
        data: {
          game: addGame
        }
      })

      client.writeQuery({
        query: GET_JOBS_BY_GAME_ID_CLIENT,
        variables: { gameId: addGame.id },
        data: {
          getJobsByGameId: null
        }
      })

      client.writeQuery({
        query: GET_MISSIONS_CLIENT,
        variables: { gameId: addGame.id },
        data: {
          missions: []
        }
      })

      // update storage
      localStorage.setItem('games', JSON.stringify(newGames))
      localStorage.setItem('game', JSON.stringify(addGame))
    },
    onCompleted({ addGame }) {
      // send email
      sendMessage({
        variables: {
          recipientId: addGame.applicant.id,
          subject: 'Invitation to 10 Jobs Challenge',
          message: `<p>Visit this link <a href=${"https://tenjobschallengev2.herokuapp.com/"}>10 Jobs Challenge</a></p>`,
        }
      })
      navigate(`/challenges/${addGame.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('')}/lists`)
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
      <form style={{ width: '300px' }} onSubmit={handleSubmit} className='add-game-form-body'>
        <h4 className='add-game-form-title'>New 10 Jobs Challenge</h4>
        <label>
          <input
            style={inputStyle(state.titleError)}
            id='title'
            onChange={handleChange}
            name="title"
            value={state.title}
            type="text"
            placeholder='Title...'
          />
          <span>{state.submitAttempted && state.nameError}</span>
        </label>
        <h6 className='add-game-form-invite-title'>Invite your friend</h6>
        <div className='add-game-form-invite-fields'>
          <label>
            <input
              style={inputStyle(state.emailError)}
              onChange={handleChange}
              name="email"
              value={state.email}
              type="text"
              placeholder='friend email...'
            />
          </label>
          <label>
            <input
              style={inputStyle(state.nameError)}
              onChange={handleChange}
              name="name"
              value={state.name}
              type="text"
              placeholder='friend name...'
            />
          </label>
        </div>
        <div className='add-game-form-buttons'>
          <button className='add-game-form-button-save' type="submit">Save</button>
          <button className='add-game-form-button-cancel' type="button" onClick={openModal}>Cancel</button>
        </div>
        <span>{state.submitAttempted && state.emailError}</span>
        <p>{state.submitMessage}</p>
      </form>
    </div>
  )
}

export default AddGameForm