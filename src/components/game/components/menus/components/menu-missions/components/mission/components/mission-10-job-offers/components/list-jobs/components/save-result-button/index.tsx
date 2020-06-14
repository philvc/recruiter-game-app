import * as React from 'react';

// modules
import { navigate } from '@reach/router';

// apollo
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_MISSION_V2 } from '../../../../../../../../../../../../../../graphql/mutations/server/updateMissionV2';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_GAME_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getMissionsClient';
import { CREATE_MISSION } from '../../../../../../../../../../../../../../graphql/mutations/server/createMissionServer';
import { PUSH_NOTIFICATION } from '../../../../../../../../../../../../../../graphql/mutations/server/pushNotification';

const SaveResultButton = () => {

  // client
  const client = useApolloClient();
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // mutations
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2, {
    onCompleted({ updateMissionV2 }) {

      client.writeQuery({
        query: GET_MISSION_CLIENT,
        data: {
          mission: updateMissionV2,
        }
      })

      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })

      // update storage
      localStorage.setItem('mission', JSON.stringify(updateMissionV2))
      localStorage.setItem('missions', JSON.stringify(missions))
      navigate(`/challenges/${game.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('')}/lists`)
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

  const [pushNotification] = useMutation(PUSH_NOTIFICATION)

  // handlers
  function handleClick(e: any) {

    updateMissionV2({
      variables: {
        id: mission.id,
        field: 'status',
        data: 'completed',
      }
    })

    pushNotification({
      variables: {
        recipientId: game.recruiter.id,
        label: '10 job offers mission has been scored !',
        gameId: game.id,
      }
    })
    pushNotification({
      variables: {
        recipientId: game.recruiter.id,
        label: 'Congrats you have unlocked a job application !',
        gameId: game.id,
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