import * as React from 'react';

// apollo
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_MISSION_V2 } from '../../../../../../../../../../../../../../graphql/mutations/server/updateMissionV2';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';

const ListProgress = ({ jobs }: any) => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

  // mutations
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2)

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
      <p>{completedJobs}/10</p>
      {completedJobs === 10 && <button>Send for review</button>}
    </div>
  )
}

export default ListProgress;