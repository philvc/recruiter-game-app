import * as React from 'react';

// modules
import { navigate } from '@reach/router';

// apollo
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_MISSION_V2 } from '../../../../../../../../../../../../../../graphql/mutations/server/updateMissionV2';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';
import { ADD_JOB_APPLICATION_MISSION } from '../../../../../../../../../../../../../../graphql/mutations/server/addJobApplicationMission';
import { GET_GAME_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getMissionsClient';

const SaveResultButton = () => {

  // client
  const client = useApolloClient();
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // mutations
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2, {
    onCompleted({ updateMissionV2 }) {

      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })
      console.log('missions', missions)
      // update storage
      localStorage.setItem('mission', JSON.stringify(updateMissionV2))
      localStorage.setItem('missions', JSON.stringify(missions))
    }
  })

  const [addJobApplicationMission] = useMutation(ADD_JOB_APPLICATION_MISSION, {
    onCompleted({ addJobApplicationMission }) {
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })
      const newMissions = missions.concat(addJobApplicationMission)
      client.writeQuery({
        query: GET_MISSIONS_CLIENT,
        variables: { gameId: game.id },
        data: { missions: newMissions }
      })

      localStorage.setItem('missions', JSON.stringify(newMissions))
    }
  })

  // helpers
  function handleClick(e: any) {
    updateMissionV2({
      variables: {
        id: mission.id,
        field: 'status',
        data: 'completed',
      }
    })

    // add 1 job-application mission
    addJobApplicationMission({
      variables: {
        quantity: 1,
        gameId: game.id
      }
    })

    setTimeout(() => { navigate(`/games/${game.title.split(" ").join('')}/missions`) }, 1)

  }

  return (
    <button onClick={handleClick}>Save result</button>
  )
}

export default SaveResultButton;