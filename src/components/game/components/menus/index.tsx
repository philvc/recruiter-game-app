import * as React from 'react';

// modules
import { Router, Redirect } from '@reach/router';
import { useSubscription, useApolloClient } from '@apollo/client';

// components
import MenuMissions from './components/menu-missions';
import Settings from './components/menu-settings';
import Sidebar from '../../../sidebar';
import MenuChallenges from './components/menu-challenges';
import MenuScoreboard from './components/menu-scoreboard';
import MenuNotification from './components/menu-notifications';

// style
import './styles.css';

// apollo
import { NEW_MISSION_SUBSCRIPTION } from '../../../../graphql/subscriptions/newMission';
import { GET_GAME_CLIENT } from '../../../../graphql/queries/client/getGameClient';
import { GET_MISSIONS_CLIENT } from '../../../../graphql/queries/client/getMissionsClient';

const Menus = ({ path }: any) => {

  const client = useApolloClient();
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  const { loading, error, data: newMissionSubscriptionData } = useSubscription(NEW_MISSION_SUBSCRIPTION, { variables: { gameId: game.id } })

  React.useEffect(() => {
    if (newMissionSubscriptionData) {
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })
      if (missions.length > 0) {
        const index = missions.findIndex((mission: any) => mission.id === newMissionSubscriptionData.newMission[0].id)
        if (index === -1) {
          const newMissions = missions.concat(newMissionSubscriptionData.newMission)
          client.writeQuery({
            query: GET_MISSIONS_CLIENT,
            variables: { gameId: game.id },
            data: {
              missions: newMissions
            }
          })

          localStorage.setItem('missions', JSON.stringify(newMissions))
        }
      }
    }
  }, [newMissionSubscriptionData, client, game.id])

  return (
    <div className='menus-container'>
      <Sidebar />
      <div className='menus-container-router'>
        <Router>
          <MenuMissions path='missions/*' />
          <MenuChallenges path='challenges/*' />
          <MenuScoreboard path='scoreboard/*' />
          <Settings path='settings/*' />
          <Redirect from='/' to='missions' noThrow />
        </Router>
      </div>
      <MenuNotification />
    </div>
  )
}

export default Menus; 