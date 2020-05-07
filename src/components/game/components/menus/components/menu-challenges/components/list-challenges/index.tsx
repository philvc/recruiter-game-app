import * as React from 'react';
import NavBar from '../../../../../../../navbar';
import { useApolloClient } from '@apollo/client';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import ChallengeItem from './components/challenge-item';

const ListChallenges = ({ path, navigate }: any) => {
  const client = useApolloClient()
  const { missions }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })
  const challengesList = missions.filter((mission: any) => mission.type === 'jobapplication')

  function handleClick(challenge: any) {
    client.writeQuery({
      query: GET_PLAYERANDGAMES_CLIENT,
      data: {
        missionId: challenge.id,
        mission: challenge,
      }
    })
    localStorage.setItem('mission', JSON.stringify(challenge))
    localStorage.setItem('missionId', challenge.id)
    navigate(`${challenge.id}`)
  }

  return (
    <div>
      <NavBar />
      <div>
        <h3>Challenges</h3>
        {challengesList.map((challenge: any) => (
          <ChallengeItem key={challenge.id} challenge={challenge} handleClick={handleClick} />
        ))}
      </div>
    </div>
  )
}

export default ListChallenges