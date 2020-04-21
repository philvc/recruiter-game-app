import * as React from 'react';

// modules
import { useMutation, useQuery } from '@apollo/react-hooks';

// grapqhql
import { ADD_MISSION_SERVER } from '../../../../../../graphql/mutations/server/addMutationServer';
import { GET_MISSIONS_CLIENT } from '../../../../../../graphql/queries/client/getMissionsClient';
import { GET_MISSIONS_SERVER } from '../../../../../../graphql/queries/server/getMissionsServer';

const MissionList = ({ path, gameId }: any) => {
  const { loading, error, data } = useQuery(GET_MISSIONS_SERVER, { variables: { gameId } })
  const [addMission] = useMutation(ADD_MISSION_SERVER, {
    update(cache, { data: { addMission } }) {
      const { missions }: any = cache.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId } })
      cache.writeQuery({
        query: GET_MISSIONS_CLIENT,
        variables: { gameId },
        data: {
          missions: missions.concat([addMission])
        }
      })
    }
  })

  function handleClick() {
    addMission({ variables: { type: '10jobs', gameId, } })
  }

  if (loading) return null
  if (error) return null

  return (
    <div>
      <div>Mission ></div>
      {data && data.missions.map((mission: any) => <p key={mission.id}>{mission.type}</p>)}
      <button onClick={handleClick}>Start 10 jobs mission</button>
    </div>
  )
}

export default MissionList;