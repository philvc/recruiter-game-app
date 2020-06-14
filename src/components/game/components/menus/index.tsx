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
import { GET_PLAYER_CLIENT } from '../../../../graphql/queries/client/getPlayerClient';
import { NEW_JOBS_SUBSCRIPTION } from '../../../../graphql/subscriptions/newJobs';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../graphql/queries/client/getJobsByGameIdClient';
import { UPDATED_JOB_SUBSCRIPTION } from '../../../../graphql/subscriptions/updatedJob';

const Menus = ({ path }: any) => {

  // client
  const client = useApolloClient();
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })

  // subscriptions
  const { loading: newMissionSubscriptionLoading, error: newMissionSubscriptionError, data: newMissionSubscriptionData } = useSubscription(NEW_MISSION_SUBSCRIPTION, { variables: { gameId: game.id, playerId: player.id } })

  const { loading: updatedMissionSubscriptionLoading, error: updatedMissionSubscriptionError, data: updatedMissionSubscriptionData } = useSubscription(UPDATED_MISSION_SUBSCRIPTION, { variables: { gameId: game.id } })

  const { data: newJobsSubscriptionData } = useSubscription(NEW_JOBS_SUBSCRIPTION, { variables: { playerId: player.id } })

  const { data: updatedJobSubscriptionData } = useSubscription(UPDATED_JOB_SUBSCRIPTION, { variables: { gameId: game.id } })

  // effects
  React.useEffect(() => {
    if (updatedJobSubscriptionData) {
      const { updatedJob } = updatedJobSubscriptionData;
      const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })
      const index = getJobsByGameId.findIndex((job: any) => job.id === updatedJob.id);
      const isMissionEqual = isEqual(getJobsByGameId[index], updatedJob);

      if (!isMissionEqual) {

        const newJobs = getJobsByGameId.map((job: any) => {
          if (job.id === updatedJob.id) {
            return updatedJob
          } else {
            return job
          }

        })
        client.writeQuery({
          query: GET_JOBS_BY_GAME_ID_CLIENT,
          variables: { gameId: game.id },
          data: {
            missions: newJobs,
          }
        })
        localStorage.setItem('jobs', JSON.stringify(newJobs))

      }
    }
  }, [updatedJobSubscriptionData, game.id, client])

  React.useEffect(() => {
    if (newJobsSubscriptionData) {
      const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })
      const newJobs = getJobsByGameId.concat(newJobsSubscriptionData.newJobs)
      client.writeQuery({
        query: GET_JOBS_BY_GAME_ID_CLIENT,
        variables: { gameId: game.id },
        data: {
          getJobsByGameId: newJobs
        }
      })
      localStorage.setItem('jobs', JSON.stringify(newJobs))
    }
  }, [newJobsSubscriptionData, game.id, client])


  React.useEffect(() => {
    if (newMissionSubscriptionData) {
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })
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
          <MenuMissions path='lists/*' />
          <MenuChallenges path='applications/*' />
          <MenuScoreboard path='scoreboard/*' />
          <Settings path='settings/*' />
          <Redirect from='/' to='lists' noThrow />
        </Router>
      </div>
      <MenuNotification />
    </div>
  )
}

export default Menus; 