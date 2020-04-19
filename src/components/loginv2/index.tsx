import * as React from 'react';

// packages
import { useLazyQuery, useMutation, useApolloClient, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';

// helpers
import { formReducer, actions } from './reducer';

// graphql
import { GET_PLAYERANDGAMES_SERVER } from '../../graphql/queries/server/getPlayerAndGamesServer';
import { ADD_PLAYERANDGAMES_CLIENT } from '../../graphql/mutations/client/addPlayerAndGames';
import { GET_PLAYERANDGAMES_CLIENT } from '../../graphql/queries/client/getPlayerAndGamesClient';

const initialState = {
  email: '',
  emailError: null,
  submitAttempted: false,
  submitMessage: '',
  status: 'clean',
}

const ISLOGGEDIN = gql`
  query IsPlayerLoggedIng {
    isLoggedIn @client
  }
`
const LoginV2 = ({ path }: any) => {
  const [state, dispatch] = React.useReducer(formReducer, initialState)
  const [addPlayerAndGames] = useMutation(ADD_PLAYERANDGAMES_CLIENT)
  const client = useApolloClient();
  const { data } = useQuery(ISLOGGEDIN)
  console.log('is loggedin :', data)
  const [getAccount, { loading }] = useLazyQuery(
    GET_PLAYERANDGAMES_SERVER,
    {
      onCompleted({ games }) {
        const { player }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })
        console.log('player readQuery :', player)
        client.writeQuery({
          query: GET_PLAYERANDGAMES_CLIENT,
          data: {
            isLoggedIn: true,
            player: {
              id: '',
              email: '',
              firstName: 'koko',
              lastName: '',
              __typename: 'Player'
            }
          }
        })
        // console.log('getPlayerandgames:', player, games)
        // faire une mutation pas un writeData sinon je les ai en double
        // addPlayerAndGames({
        //   variables: {
        //     player,
        //     games,
        //   }
        // })
        // update localStorage 
        // client.writeData({
        //   data: {
        //     player: {
        //       id: '',
        //       email: '',
        //       firstName: 'Update toi putiiinn',
        //       lastName: '',
        //       __typename: 'Player'
        //     },
        //     games: [...games]
        //   }
        // })
        // const stringPlayer = JSON.stringify(player)
        // localStorage.setItem('player', stringPlayer)
        // const stringGames = JSON.stringify(games)
        // localStorage.setItem('games', stringGames)
        navigate('/email')
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
        {loading && <p>Moving to your account</p>}
        <button type="submit">START</button>
      </form>
    </div>
  )
}

export default LoginV2;