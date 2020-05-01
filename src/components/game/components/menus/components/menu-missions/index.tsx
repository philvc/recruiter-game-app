import * as React from 'react';

// modules
import { Router } from '@reach/router';

// components
import ListMissions from './components/list-missions';
import NotFound from '../../../../../notFound';

// graphql
import { useQuery } from '@apollo/client';
import { GET_GAME_ID_CLIENT } from '../../../../../../graphql/queries/client/getGameId';
import Mission from './components/mission';

const MenuMissions = ({ path }: any) => {
  const { loading, error, data }: any = useQuery(GET_GAME_ID_CLIENT)

  if (loading) return null
  if (error) return null

  return (
    <Router>
      <ListMissions path='/' gameId={data.gameId} />
      <Mission path='/:missionId' />
      <NotFound default />
    </Router>
  )
}

export default MenuMissions;