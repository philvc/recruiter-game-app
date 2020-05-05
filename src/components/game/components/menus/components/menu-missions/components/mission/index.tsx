import * as React from 'react';
import { useApolloClient, gql, useLazyQuery } from '@apollo/client';
import NavBar from '../../../../../../../navbar';
import JobOffers from './components/jobOffers';
import { GET_MISSION_ID_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionId';
import { GET_MISSION_SERVER } from '../../../../../../../../graphql/queries/server/getMission';

const Mission = ({ path }: any) => {

  const [getMission, { data }] = useLazyQuery(GET_MISSION_SERVER)

  const client = useApolloClient()
  const { missionId }: any = client.readQuery({ query: GET_MISSION_ID_CLIENT })
  const mission = client.readFragment({
    id: `Mission:${missionId}`,
    fragment: gql`
      fragment myMission on Mission{
        type
      }
    `
  }, true)
  const [stateMission, setStateMission] = React.useState(mission)


  React.useEffect(() => {
    if (stateMission === null) {
      getMission({ variables: { missionId } })
    }
    if (data?.mission) {
      setStateMission(data.mission)
    }
  }, [stateMission, getMission, missionId, data])


  const renderMission = (type: any) => {
    switch (type) {
      case '10jobs':
        return <JobOffers />;
      default:
        return null
    }
  }


  return (
    <div>
      <NavBar />
      <div>
        {renderMission(stateMission?.type)}
      </div>
    </div>
  )
}

export default Mission