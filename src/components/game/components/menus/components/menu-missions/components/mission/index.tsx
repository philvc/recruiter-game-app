import * as React from 'react';
import { useApolloClient, gql } from '@apollo/client';
import NavBar from '../../../../../../../navbar';
import JobOffers from './components/jobOffers';
import { GET_MISSION_ID_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionId';

const Mission = ({ path }: any) => {
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
        {renderMission(mission?.type)}
      </div>
    </div>
  )
}

export default Mission