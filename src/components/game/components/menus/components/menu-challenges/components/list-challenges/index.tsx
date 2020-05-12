import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// components
import NavBar from '../../../../../../../navbar';
import ChallengeItem from './components/challenge-item';

// apollo
import { GET_MISSIONS_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionsClient';
import { GET_GAME_CLIENT } from '../../../../../../../../graphql/queries/client/getGameClient';
import { GET_MISSION_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionClient';

const ListChallenges = ({ path, navigate }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })


  const challengesList = missions.filter((mission: any) => mission.type === 'jobapplication')

  // helpers
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