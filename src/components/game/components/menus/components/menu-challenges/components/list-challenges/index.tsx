import * as React from 'react';
import NavBar from '../../../../../../../navbar';
import { useApolloClient, useMutation } from '@apollo/client';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import { UPDATE_MISSION_STATUS } from '../../../../../../../../graphql/mutations/server/updateMissionStatus';
import ChallengeItem from './components/challenge-item';

const ListChallenges = ({ path, navigate }: any) => {
  const client = useApolloClient()
  const { missions }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })
  const [updateMissionStatus] = useMutation(UPDATE_MISSION_STATUS)
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
    if (challenge.status === 'new') {
      updateMissionStatus({ variables: { missionId: challenge.id, status: 'pending' } })
    }
    navigate(`${challenge.id}`)
  }

  return (
    <div>
      <NavBar />
      <div>
        <h3>Challenges</h3>
        {challengesList.map((challenge: any) => (
          <ChallengeItem challenge={challenge} handleClick={handleClick} />
        ))}
      </div>
    </div>
  )
}

export default ListChallenges