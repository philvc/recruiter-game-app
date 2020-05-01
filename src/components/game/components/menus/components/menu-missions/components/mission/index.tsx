import * as React from 'react';
import { GET_MISSION_CLIENT } from '../../../../../../../../graphql/queries/client/getMission';
import { useQuery } from '@apollo/client';
import NavBar from '../../../../../../../navbar';
import { useLocation } from '@reach/router';
import JobOffers from './components/jobOffers';

const Mission = ({ path, missionId }: any) => {
  const location = useLocation()
  const gameId = location.pathname.split('/').slice(1)[1]
  const { loading, error, data } = useQuery(GET_MISSION_CLIENT, {
    variables: { missionId, gameId }
  })

  if (loading) return null
  if (error) return null

  const { type } = data.mission

  const renderMission = (type: any) => {
    switch (type) {
      case '10jobs':
        return <JobOffers missionId={missionId} />;
      default:
        return null
    }
  }
  return (
    <div>
      <NavBar />
      <div>
        {renderMission(type)}
      </div>
    </div>
  )
}

export default Mission