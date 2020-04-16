import * as React from 'react';

// packages
import { useMutation } from '@apollo/react-hooks';
import { navigate } from '@reach/router';

// graphql
import { LOGIN_MUTATION } from '../../graphql/mutations';

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

const Login = ({ path }: any) => {
  const { playerContextDispatch } = React.useContext(PlayerContext)
  const [state, dispatch] = React.useReducer(formReducer, initialState)
  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    update(cache, { data: loginMutation }) {
      console.log('login data :', loginMutation)
      if (loginMutation.login) {
        const { id, firstName, lastName, email } = loginMutation.login;
        // update PlayerContext
        playerContextDispatch({ type: 'playerChanged', payload: loginMutation.login })

        // update cache
        cache.writeData({
          data: {
            player: {
              id,
              firstName,
              lastName,
              email,
              _typename: 'player'
            }
          }
        })

        // update localStorage
        if (!localStorage.hasOwnProperty('player')) {
          const player = { id, firstName, lastName, email }
          const playerString = JSON.stringify(player)
          localStorage.setItem('player', playerString)
        }
        navigate(`/${firstName}`)
      }
      return null
      // create account & verify email
    }
  })

  function handleChange({ target: { value } }: any) {
    dispatch({ type: actions.emailChanged, payload: value })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    loginMutation({ variables: { email: state.email } })
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

export default Login;