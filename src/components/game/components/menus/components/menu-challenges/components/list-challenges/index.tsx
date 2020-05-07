import * as React from 'react';
import NavBar from '../../../../../../../navbar';
import { useApolloClient } from '@apollo/client';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import ChallengeItem from './components/challenge-item';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionsClient';
import { GET_GAME_ID_CLIENT } from '../../../../../../../../graphql/queries/client/getGameIdClient';

const ListChallenges = ({ path, navigate }: any) => {
  const client = useApolloClient()
  const { gameId }: any = client.readQuery({ query: GET_GAME_ID_CLIENT })
  const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId } })
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