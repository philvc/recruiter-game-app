import * as React from 'react';

// modules
import { Router } from '@reach/router';

// components
import ListMissions from './components/list-missions';
import NotFound from '../../../../../notFound';

// graphql
import { useQuery } from '@apollo/client';
import { GET_GAME_ID_CLIENT } from '../../../../../../graphql/queries/client/getGameId';
import JobOffers from './components/jobOffers';

const Mission = ({ path }: any) => {
  const { loading, error, data }: any = useQuery(GET_GAME_ID_CLIENT)

  if (loading) return null
  if (error) return null
  console.log('gameId', data.gameId)

  return (
    <Router>
      <ListMissions path='/' gameId={data.gameId} />
      <JobOffers path='10jobs/:missionId' />
      <NotFound default />
    </Router>
  )
}

export default Mission;