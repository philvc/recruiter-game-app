import * as React from 'react';

// apollo
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_MISSION_V2 } from '../../../../../../../../../../../../../../graphql/mutations/server/updateMissionV2';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';

const ListProgress = ({ jobs }: any) => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  console.log('mission', mission)

  // mutations
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2, {
    onCompleted({ updateMissionV2 }) {
      localStorage.setItem('mission', JSON.stringify(updateMissionV2))
    }
  })

  const completedJobs = jobs.filter((job: any) => job.url !== "" && job.name !== "").length

  // effect 
  React.useEffect(() => {
    updateMissionV2({
      variables: {
        id: mission.id,
        field: 'progress',
        data: completedJobs,
      }
    })
  }, [jobs, updateMissionV2, mission, completedJobs])

  return (
    <div>
      <p>{mission.progress}/10 <span>{mission.progress === 10 ? 'list completed' : null}</span></p>
    </div>
  )
}

export default ListProgress;