import * as React from 'react';

// modules
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

// components
import JobOffersTable from './components/table';
import { useApolloClient, gql, useQuery } from '@apollo/client';
import { GET_MISSION_ID_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionId';
import { GET_MISSION_SERVER } from '../../../../../../../../../../graphql/queries/server/getMission';

const JobOffers = () => {
  const client = useApolloClient()
  const { missionId }: any = client.readQuery({ query: GET_MISSION_ID_CLIENT })
  const { loading, error, data } = useQuery(GET_MISSION_SERVER, { variables: { id: missionId } })
  const [progress, setProgress] = React.useState(null)

  React.useEffect(() => {
    if (data) {

      setProgress(data.mission.progress)
    }
  }, [data, client, missionId])

  if (loading) return null
  if (error) return null



  return (
    <div>
      <h1>10 Job Offers Mission</h1>
      {data && progress && <p>{`${progress}/10`}</p>}
      <DndProvider backend={Backend}>
        <JobOffersTable missionId={missionId} />
      </DndProvider>
      {progress === 10 && <button>Push for review</button>}
    </div>
  )
}

export default JobOffers;