import * as React from 'react';

// packages
import { useLazyQuery, useApolloClient } from '@apollo/client';
import { navigate } from '@reach/router';

// helpers
import { formReducer, actions } from './reducer';

// graphql
import { GET_PLAYERANDGAMES_CLIENT } from '../../graphql/queries/client/getPlayerAndGamesClient';
import { GET_ACCOUNT } from '../../graphql/queries/server/getAccount';

const initialState = {
  email: '',
  emailError: null,
  submitAttempted: false,
  submitMessage: '',
  status: 'clean',
}

const LoginV2 = ({ path }: any) => {
  const [state, dispatch] = React.useReducer(formReducer, initialState)
  const client = useApolloClient();
  const [getAccount, { loading }] = useLazyQuery(
    GET_ACCOUNT,
    {
      onCompleted({ account }) {
        const { player, games } = account;
        client.writeQuery({
          query: GET_PLAYERANDGAMES_CLIENT,
          data: {
            player: {
              id: player.id,
              email: player.email,
              firstName: player.firstName,
              lastName: player.lastName,
            },
            games: [...games]
          }
        })
        localStorage.setItem('player', JSON.stringify(player))
        localStorage.setItem('games', JSON.stringify(games))
        navigate(`/${player.firstName}/select`)
      }
    })

  React.useEffect(() => {
    if (state.status === 'completed') {
      getAccount({ variables: { email: state.email } })
    }
  }, [state, getAccount])

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
    <div>
      <h1>10 Jobs Challenge</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>email:</span>
          <input
            style={inputStyle(state.emailError)}
            onChange={handleChange}
            name="email"
            value={state.email}
            type="text"
          />
          <span>{state.submitAttempted && state.emailError}</span>
        </label>
        <p>{state.submitMessage}</p>
        {loading && <p>Moving to your account</p>}
        <button type="submit">START</button>
      </form>
    </div>
  )
}

export default LoginV2;