import * as React from 'react';

// modules
import { Router } from '@reach/router';

// components
import ListMissions from './components/list-missions';
import NotFound from '../../../../../notFound';

// graphql
import { useApolloClient } from '@apollo/client';
import Mission from './components/mission';
import { GET_GAME_ID_CLIENT } from '../../../../../../graphql/queries/client/getGameIdClient';

const MenuMissions = ({ path }: any) => {
  const client = useApolloClient()
  const { gameId }: any = client.readQuery({ query: GET_GAME_ID_CLIENT })


  return (
    <Router>
      <ListMissions path='/' gameId={gameId} />
      <Mission path='/:missionId' />
      <NotFound default />
    </Router>
  )
}

export default MenuMissions;