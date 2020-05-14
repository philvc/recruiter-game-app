import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// components
import NavBar from '../../../../../../../navbar';
import Mission10JobOffers from './components/mission-10-job-offers';
import Contact from '../../../../../../../contact';

// apollo
import { GET_MISSION_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionClient';

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
      <Contact />
    </div>
  )
}

export default Mission