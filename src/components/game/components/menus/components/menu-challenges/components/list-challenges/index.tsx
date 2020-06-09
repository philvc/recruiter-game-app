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

const ListChallenges = ({ path, navigate }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

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

  console.log('length missions data, challenges list', missionsData.missions.length, challengesList.length)
  return (
    <div className='list-challenges-container'>
      <NavBar />
      <div className='list-challenges-container-body'>
        <h3>Menu Challenges</h3>
        <div className='list-challenges-container-body-list'>
          {(missionsData.missions.length === 0 || challengesList.length === 0) && (
            <div className="list-challenges-description-container">
              <p>Welcome to the challenges menu !</p>
              <p>Here you will find different challenges to give to your friend.</p>
              <p>Currently, you have no challenge available, try to complete one mission and see what challenge you receive to give to your applicant !</p>
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