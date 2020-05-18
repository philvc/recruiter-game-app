import * as React from 'react';

// component
import ReviewButton from './components/review-button';

// apollo
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_MISSION_V2 } from '../../../../../../../../../../../../../../graphql/mutations/server/updateMissionV2';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getMissionsClient';
import { GET_GAME_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getJobsByGameIdClient';

const ListProgress = () => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })

  // mutations
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2, {
    onCompleted({ updateMissionV2 }) {
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })

      localStorage.setItem('mission', JSON.stringify(updateMissionV2))
      localStorage.setItem('missions', JSON.stringify(missions))

    }
  })

  const completedJobs = getJobsByGameId.filter((job: any) => job.url !== "" && job.name !== "").length

  // effect 
  React.useEffect(() => {
    updateMissionV2({
      variables: {
        id: mission.id,
        field: 'progress',
        data: completedJobs,
      }
    })
  }, [getJobsByGameId, updateMissionV2, mission, completedJobs])

  return (
    <div>
      <p>{mission.progress || 0}/10 <span>{mission.progress === 10 ? 'list completed' : null}</span></p>
      {mission.progress === 10 && !mission.isReviewed && < ReviewButton />}
    </div>
  )
}

export default ListProgress;