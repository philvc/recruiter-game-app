import * as React from 'react';

// packages
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';

// helpers
import { formReducer, actions } from './reducer';

// graphql
import { GET_PLAYERANDGAMES_SERVER } from '../../graphql/queries/getPlayerAndGames';

const initialState = {
  email: '',
  emailError: null,
  submitAttempted: false,
  submitMessage: '',
  status: 'clean',
}


const LoginV2 = ({ path }: any) => {
  const [state, dispatch] = React.useReducer(formReducer, initialState)
  const client: ApolloClient<any> = useApolloClient()
  const [getAccount] = useLazyQuery(
    GET_PLAYERANDGAMES_SERVER,
    {
      onCompleted({ player, games }) {

        client.writeData({
          data: {
            player: { ...player },
            games: games ? [...games] : null
          }
        })
        // update localStorage 
        const stringPlayer = JSON.stringify(player)
        localStorage.setItem('player', stringPlayer)
        // const stringGames = JSON.stringify(games)
        // localStorage.setItem('games', stringGames)

        window.location.reload(false)
      }
    })

  // const { data } = useQuery(GET_PLAYER)
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
        <button type="submit">START</button>
      </form>
    </div>
  )
}

export default LoginV2;