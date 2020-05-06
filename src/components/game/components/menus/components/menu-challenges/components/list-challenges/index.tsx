import * as React from 'react';
import NavBar from '../../../../../../../navbar';
import { useApolloClient } from '@apollo/client';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';

const ListChallenges = ({ path, navigate }: any) => {
  const client = useApolloClient()
  const { missions }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })
  const challengesList = missions.filter((mission: any) => mission.type === 'jobapplication')
  return (
    <div>
      <NavBar />
      <div>
        <h3>Challenges</h3>
        {challengesList.map((challenge: any) => (
          <div>
            <p>Apply for jobs</p>
            <button onClick={() => {
              navigate(`${challenge.id}`)
            }}>Start</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListChallenges