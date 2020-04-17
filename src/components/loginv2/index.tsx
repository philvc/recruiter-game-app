import * as React from 'react';

// packages
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { navigate } from '@reach/router';

// graphql
import { LOGIN_MUTATION } from '../../graphql/mutations';
import { GET_ACCOUNT } from '../../graphql/queries';


// context actions
import { PlayerContext } from '../../App.ctx';


const actions = {
  emailChanged: 'EMAIL_CHANGED',
  formSubmitted: 'FORM_SUBMITTED',
}

const initialState = {
  email: '',
  emailError: null,
  submitAttempted: false,
  submitMessage: '',
  status: 'clean',
}

function formReducer(state: any, action: any) {
  let error
  switch (state.status) {
    case 'dirty':
      switch (action.type) {
        case actions.formSubmitted:
          let formValid = true
          let emailError = validate('email', state.email)
          if (emailError || !state.email) {
            formValid = false
          }
          return {
            ...state,
            emailError,
            submitAttempted: true,
            status: formValid ? 'completed' : 'dirty',
            submitMessage: formValid
              ? 'Form Submitted Successfully'
              : 'Form Has Errors',
          }
      };
    // no 'break' or 'return', case 'dirty' continues!
    // eslint-disable-next-line no-fallthrough
    case 'clean':
      switch (action.type) {
        case actions.emailChanged:
          error = validate('email', action.payload)
          return {
            ...state,
            email: action.payload,
            emailError: error,
            submitMessage: '',
            status: 'dirty',
          }
        case actions.formSubmitted:
          return {
            ...state,
            submitMessage: 'Please fill out the form',
          }
        default:
          return state
      }
    case 'completed':
    // no 'break' or 'return', case 'completed' continues!
    // eslint-disable-next-line no-fallthrough
    default:
      return state
  }
}

function validate(name: any, value: any) {
  if (typeof value === 'string') value = value.trim()

  if (value.length === 0) {
    return 'Must enter email'
  } else if (
    !value.includes('@') ||
    !value.includes('.') ||
    value.split('.')[1].length < 2
  ) {
    return 'Must enter valid email'
  } else {
    return null
  }
}

const LoginV2 = ({ path }: any) => {
  const { playerContextDispatch } = React.useContext(PlayerContext)
  const [state, dispatch] = React.useReducer(formReducer, initialState)
  const [getAccount, { data }] = useLazyQuery(GET_ACCOUNT)

  function handleChange({ target: { value } }: any) {
    dispatch({ type: actions.emailChanged, payload: value })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    // mutate the Apollo client player in the cache
    getAccount({ variables: { email: state.email } })
    dispatch({ type: actions.formSubmitted })
  }

  const inputStyle = (hasError: boolean) => {
    return {
      outline: hasError && state.submitAttempted ? '2px solid red' : 'none',
    }
  }

  if (data) {
    console.log('data getAccount :', data);
    const { player, games } = data.player;

    //  Locastorage
    if (!localStorage.hasOwnProperty('player')) {
      const stringPlayer = JSON.stringify(player)
      localStorage.setItem('player', stringPlayer)
    }
    if (!localStorage.hasOwnProperty('games')) {
      const stringGames = JSON.stringify(games)
      localStorage.setItem('games', stringGames)
    }
    // mutate the Apollo client player initial state
    //navigate to 
    window.location.reload(false)
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