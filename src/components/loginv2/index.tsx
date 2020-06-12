import * as React from 'react';

// packages
import { useLazyQuery, useApolloClient } from '@apollo/client';
import { navigate } from '@reach/router';

// components
import Contact from '../contact';
// reducer
import { formReducer, actions } from './reducer';

// graphql
import { GET_ACCOUNT } from '../../graphql/queries/server/getAccount';

// style
import './style.css'
import { GET_PLAYER_CLIENT } from '../../graphql/queries/client/getPlayerClient';
import { GET_GAMES_CLIENT } from '../../graphql/queries/client/getGamesClient';

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
          query: GET_PLAYER_CLIENT,
          data: {
            player,
          }
        })

        client.writeQuery({
          query: GET_GAMES_CLIENT,
          variables: {
            playerId: player.id
          },
          data: {
            games: [...games]
          }
        })

        // update storage
        localStorage.setItem('player', JSON.stringify(player))
        localStorage.setItem('games', JSON.stringify(games))

        // navigate
        navigate(`challenges`)
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
            <div className='game-description-container'>
              <div className='game-description-section'>
                <p className='game-description-header'><b>What ?</b></p>
                <p className='game-description-content'>‘10 jobs challenge’ is a game where you can help your friend to apply for jobs.</p>
              </div>
              <div className='game-description-section'>
                <p className='game-description-header'><b>How ?</b></p>
                <p className='game-description-content'>Find job offers for your friend and ask him to apply ;)</p>
              </div>
              <div className='game-description-benchmark'>
                <p className='game-description-header-benchmark'><b>What is the difference whit an excel, google sheet or trello ?</b></p>
                <p className='game-description-content-benchmark'>None ;) The idea is just to add some gamification artifacts to make finding job funnier and a more cooperative experience.</p>
              </div>
              <div className='game-description-demo'>
                <p className='game-description-demo-title'><b>The game in 5 steps</b></p>
                <p>1. Start a new ‘10 jobs challenge’ and invite your job-seeking friend to participate</p>
                <img className='game-description-demo-picture' src={require('./assets/startChallenge.png')} alt='startChallenge' />
                <p>2. Start a new job list and find 10 job offers for your friend</p>
                <img className='game-description-demo-picture' src={require('./assets/startList.png')} alt='jobList' />
                <img className='game-description-demo-picture' src={require('./assets/list.png')} alt='jobList-table' />
                <p>3. Ask your friend to score your list and to save the job offers that interests him or her</p>
                <img className='game-description-demo-picture' src={require('./assets/listScore.png')} alt='jobList-score' />
                <p>4. Ask your friend to apply for selected job offers </p>
                <img className='game-description-demo-picture' src={require('./assets/applyOneJob.png')} alt='jobApplication' />
                <p>5. Finally, review your friend’s job application and validate its result</p>
                <img className='game-description-demo-picture' src={require('./assets/applicationProof.png')} alt='applicationProof' />
              </div>
              <div>
                <p>And that’s it !!</p>
                <p>Finally you can check the Scoreboard menu to compare yourself with other recruiters or job-seekers.</p>
                <p>Dont hesitate to share your feedback via the messaging box on your bottom right.</p>
              </div>
            </div>
            <Contact />
          </div>
        )
      }
    </div>
  )
}

export default LoginV2;