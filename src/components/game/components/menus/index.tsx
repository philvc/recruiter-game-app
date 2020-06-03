import * as React from 'react';

// modules
import { Router, Redirect } from '@reach/router';
import { useSubscription } from '@apollo/client';

// components
import MenuMissions from './components/menu-missions';
import Settings from './components/menu-settings';
import Sidebar from '../../../sidebar';
import MenuChallenges from './components/menu-challenges';
import MenuScoreboard from './components/menu-scoreboard';
import MenuNotification from './components/menu-notifications';

// apollo
import { NEW_MISSION_SUBSCRIPTION } from '../../../../graphql/subscriptions/newMission';

// style
import './styles.css';

const Menus = ({ path }: any) => {

  const { loading, error, data: newMissionSubscriptionData } = useSubscription(NEW_MISSION_SUBSCRIPTION, { variables: { gameId: "5ed64fb262fd396fbb4380b6" } })

  React.useEffect(() => {
    console.log('data Dans useeffect', newMissionSubscriptionData)
  }, [newMissionSubscriptionData])

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