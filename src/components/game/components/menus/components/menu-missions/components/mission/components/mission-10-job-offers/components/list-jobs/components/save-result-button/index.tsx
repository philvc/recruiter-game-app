import * as React from 'react';

// modules
import { navigate } from '@reach/router';

// apollo
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { UPDATE_MISSION_V2 } from '../../../../../../../../../../../../../../graphql/mutations/server/updateMissionV2';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_GAME_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getMissionsClient';
import { CREATE_MISSION } from '../../../../../../../../../../../../../../graphql/mutations/server/createMissionServer';

const SaveResultButton = () => {

  // client
  const client = useApolloClient();
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // mutations
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2, {
    onCompleted({ updateMissionV2 }) {

      // client.writeFragment({
      //   id: `Mission:${mission.id}`,
      //   fragment: gql`
      //     fragment Status on Mission {
      //       status
      //     }
      //   `,
      //   data: {
      //     status: 'completed'
      //   }
      // })

      client.writeQuery({
        query: GET_MISSION_CLIENT,
        data: {
          mission: updateMissionV2,
        }
      })

      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })

      console.log('missions dans onCompleted updateMission save button result', missions)
      // update storage
      localStorage.setItem('mission', JSON.stringify(updateMissionV2))
      localStorage.setItem('missions', JSON.stringify(missions))
      navigate(`/games/${game.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('')}/missions`)
    }
  })

  const [createMission] = useMutation(CREATE_MISSION, {
    onCompleted({ createMission }) {
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })
      const newMissions = missions.concat(createMission)
      client.writeQuery({
        query: GET_MISSIONS_CLIENT,
        variables: { gameId: game.id },
        data: { missions: newMissions }
      })

      localStorage.setItem('missions', JSON.stringify(newMissions))
    }
  })

  // handlers
  function handleClick(e: any) {
    updateMissionV2({
      variables: {
        id: mission.id,
        field: 'status',
        data: 'completed',
      }
    })

    // add 1 job-application mission
    createMission({
      variables: {
        quantity: 1,
        gameId: game.id,
        type: 'jobapplication',
      }
    })


  }

  return (
    <button onClick={handleClick}>Save result</button>
  )
}

export default SaveResultButton;