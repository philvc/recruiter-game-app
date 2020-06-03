import * as React from 'react';

// modules
import { Router, Redirect } from '@reach/router';
import { useSubscription, useApolloClient } from '@apollo/client';
import isEqual from 'lodash/isEqual';

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
import { UPDATED_MISSION_SUBSCRIPTION } from '../../../../graphql/subscriptions/updatedMission';

const Menus = ({ path }: any) => {

  // client
  const client = useApolloClient();
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // subscriptions
  const { loading: newMissionSubscriptionLoading, error: newMissionSubscriptionError, data: newMissionSubscriptionData } = useSubscription(NEW_MISSION_SUBSCRIPTION, { variables: { gameId: game.id } })

  const { loading: updatedMissionSubscriptionLoading, error: updatedMissionSubscriptionError, data: updatedMissionSubscriptionData } = useSubscription(UPDATED_MISSION_SUBSCRIPTION, { variables: { gameId: game.id } })

  // effects
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

  React.useEffect(() => {

    if (updatedMissionSubscriptionData) {
      const { updatedMission } = updatedMissionSubscriptionData;
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } });
      const index = missions.findIndex((mission: any) => mission.id === updatedMissionSubscriptionData.updatedMission.id);
      const isMissionEqual = isEqual(missions[index], updatedMissionSubscriptionData.updatedMission);

      if (!isMissionEqual) {

        const newMissions = missions.map((mission: any) => {
          if (mission.id === updatedMission.id) {
            return updatedMission
          } else {
            return mission
          }

        })
        client.writeQuery({
          query: GET_MISSIONS_CLIENT,
          variables: { gameId: game.id },
          data: {
            missions: newMissions,
          }
        })
        localStorage.setItem('missions', JSON.stringify(newMissions))

      }
    }

  }, [updatedMissionSubscriptionData, client, game.id])

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