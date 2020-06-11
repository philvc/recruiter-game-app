import * as React from 'react';

// modules
import { useApolloClient, useQuery } from '@apollo/client';

// components
import NavBar from '../../../../../../../navbar';
import ChallengeItem from './components/challenge-item';
import Contact from '../../../../../../../contact';

// styles
import './styles.css';

// apollo
import { GET_MISSIONS_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionsClient';
import { GET_GAME_CLIENT } from '../../../../../../../../graphql/queries/client/getGameClient';
import { GET_MISSION_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_PLAYER_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerClient';

const ListChallenges = ({ path, navigate }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })

  // state 
  const [challengesList, setChallengesList] = React.useState([])


  // queries
  const { loading: missionsLoading, error: missionsError, data: missionsData } = useQuery(GET_MISSIONS_CLIENT, { variables: { gameId: game.id } });

  // effects
  React.useEffect(() => {
    if (missionsData) {
      const challenges = missionsData.missions !== null ? missionsData.missions.filter((mission: any) => mission.type === 'jobapplication') : []
      setChallengesList(challenges)
    }
  }, [missionsData])

  // handlers
  function handleClick(challenge: any) {
    client.writeQuery({
      query: GET_MISSION_CLIENT,
      data: {
        mission: challenge,
      }
    })
    localStorage.setItem('mission', JSON.stringify(challenge))
    navigate(`${challenge.id}`)
  }

  if (missionsLoading) return null;
  if (missionsError) return null;

  return (
    <div className='list-challenges-container'>
      <NavBar />
      <div className='list-challenges-container-body'>
        <h3>Job applications</h3>
        <div className='list-challenges-container-body-list'>
          {(missionsData.missions.length === 0 || challengesList.length === 0) && (
            <div className="list-challenges-description-container">
              <p>Welcome to the job applications menu !</p>
              {game.applicant.id === player.id ? (
                <div>
                  <p>Here you will find the job offers your friend asked you to apply to</p>
                  <p>Currently, you have no job offers to apply to.</p>
                </div>
              ) : (
                  <div>
                    <p>Here you will be able to select a job offer from a completed list and ask your friend to apply to it !</p>
                    <p>You have no job application available, complete a job list and come back to this menu when it's finished.</p>
                  </div>
                )
              }
            </div>
          )}
          {challengesList.map((challenge: any) => (
            <div className='list-challenges-item' key={challenge.id}>
              <ChallengeItem key={challenge.id} challenge={challenge} handleClick={handleClick} />
            </div>
          ))}
        </div>
      </div>
      <Contact />
    </div>
  )
}

export default ListChallenges