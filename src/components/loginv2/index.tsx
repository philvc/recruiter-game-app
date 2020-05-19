import * as React from 'react';

// packages
import { useLazyQuery, useApolloClient } from '@apollo/client';
import { navigate } from '@reach/router';

// reducer
import { formReducer, actions } from './reducer';

// graphql
import { GET_PLAYERANDGAMES_CLIENT } from '../../graphql/queries/client/getPlayerAndGamesClient';
import { GET_ACCOUNT } from '../../graphql/queries/server/getAccount';

// style
import './style.css'

const initialState = {
  email: '',
  emailError: null,
  submitAttempted: false,
  submitMessage: '',
  status: 'clean',
}

const LoginV2 = ({ path }: any) => {

  // client
  const client = useApolloClient();

  // state
  const [state, dispatch] = React.useReducer(formReducer, initialState)

  // queries
  const [getAccount, { loading, data }] = useLazyQuery(
    GET_ACCOUNT,
    {
      onCompleted({ account }) {

        const { player, games } = account;

        // update client
        client.writeQuery({
          query: GET_PLAYERANDGAMES_CLIENT,
          data: {
            player: {
              id: player.id,
              email: player.email,
              playerName: player.playerName,
              __typename: 'Player'
            },
            games: [...games]
          }
        })

        // update storage
        localStorage.setItem('player', JSON.stringify(player))
        localStorage.setItem('games', JSON.stringify(games))

        // navigate
        navigate(`games`)
      }
    })

  // effect
  React.useEffect(() => {
    if (state.status === 'completed') {
      getAccount({ variables: { email: state.email } })
    }
  }, [state, getAccount])


  // handlers
  function handleChange({ target: { value } }: any) {
    dispatch({ type: actions.emailChanged, payload: value })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    dispatch({ type: actions.formSubmitted })
  }

  const inputStyle = (hasError: boolean) => {
    return {
      outline: hasError && state.submitAttempted ? '2px solid red' : 'none',
    }
  }


  return (
    <div className='login-container'>
      {loading || data ? (
        <p>Moving to your account</p>
      )
        :
        (
          <div className='body-container'>
            <h1>10 Jobs Challenge</h1>
            <div className='game-description-container'>
              <p>10 Jobs Challenge is a simple game where the goal is to help one of your friend to find his or her new job.</p>
              <p>Does it mean what I really think ? Yes ;)</p>
              <p>In other words, you will be become like a personal recruiter for your friend, finding him new job offers and challenging him to apply to jobs who have been confirmed.</p>
              <p>If you want to help a friend to find his or her new job, just create your account with your email address and start the 10 Jobs Challenge ;)</p>
            </div>
            <form onSubmit={handleSubmit} className='email-form'>
              <label>
                <input
                  style={inputStyle(state.emailError)}
                  onChange={handleChange}
                  name="email"
                  value={state.email}
                  type="text"
                  placeholder="Your email..."
                />
                <span>{state.submitAttempted && state.emailError}</span>
              </label>
              <button className='start-button' type="submit">START</button>
              <p>{state.submitMessage}</p>
            </form>
          </div>
        )
      }
    </div>
  )
}

export default LoginV2;