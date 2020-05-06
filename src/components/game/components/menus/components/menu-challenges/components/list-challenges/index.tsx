import * as React from 'react';
import NavBar from '../../../../../../../navbar';
import { useApolloClient, useMutation } from '@apollo/client';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import { UPDATE_MISSION_STATUS } from '../../../../../../../../graphql/mutations/server/updateMissionStatus';

const ListChallenges = ({ path, navigate }: any) => {
  const client = useApolloClient()
  const { missions }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })
  const [updateMissionStatus] = useMutation(UPDATE_MISSION_STATUS)
  const challengesList = missions.filter((mission: any) => mission.type === 'jobapplication')

  return (
    <div>
      <NavBar />
      <div>
        <h3>Challenges</h3>
        {challengesList.map((challenge: any) => (

          <div key={challenge.id}>
            <p>Apply for jobs</p>
            <button onClick={() => {
              client.writeQuery({
                query: GET_PLAYERANDGAMES_CLIENT,
                data: {
                  mission: challenge
                }
              })
              if (challenge.status === 'new') {
                updateMissionStatus({ variables: { missionId: challenge.id, status: 'pending' } })
              }
              navigate(`${challenge.id}`)
            }}>{challenge.status === 'new' ? 'Start' : 'Resume'}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListChallenges