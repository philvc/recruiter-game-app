import * as React from 'react';
import { useApolloClient } from '@apollo/client';
import NavBar from '../../../../../../../navbar';
import JobOffers from './components/jobOffers';
import { GET_MISSIONS_ROOT_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionsRootClient';

const Mission = ({ path, missionId }: any) => {
  const client = useApolloClient()

  const { missions }: any = client.readQuery({
    query: GET_MISSIONS_ROOT_CLIENT,
  })

  const index = missions.findIndex((mission: any) => mission.id === missionId)
  const missionType = missions[index].type

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
        {renderMission(missionType)}
      </div>
    </div>
  )
}

export default Mission