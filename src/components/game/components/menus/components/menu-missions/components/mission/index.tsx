import * as React from 'react';
import { useApolloClient } from '@apollo/client';
import NavBar from '../../../../../../../navbar';
import { GET_MISSION_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionClient';
import Mission10JobOffers from './components/mission-10-job-offers';

const Mission = ({ path }: any) => {

  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })


  const renderMission = (type: any) => {
    switch (type) {
      case '10jobs':
        return <Mission10JobOffers />;
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