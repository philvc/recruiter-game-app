import * as React from 'react';

// modules
import { useApolloClient, useMutation, gql } from '@apollo/client';

// components
import JobInputField from './components/job-input-field';
import JobCheckboxInputField from './components/job-checkbox-input-field';

// reducer
import { reducer } from './reducer';

// styles
import './styles.css'

// apollo
import { GET_GAME_CLIENT } from '../../../../../../../../../../../../../../../../graphql/queries/client/getGameClient';
import { GET_PLAYER_CLIENT } from '../../../../../../../../../../../../../../../../graphql/queries/client/getPlayerClient';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../../../../../../../graphql/mutations/server/updateJobServer';
import { GET_JOBS_BY_GAME_ID_CLIENT } from '../../../../../../../../../../../../../../../../graphql/queries/client/getJobsByGameIdClient';
import { GET_MISSION_CLIENT } from '../../../../../../../../../../../../../../../../graphql/queries/client/getMissionClient';
import { UPDATE_MISSION_V2 } from '../../../../../../../../../../../../../../../../graphql/mutations/server/updateMissionV2';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../../../../../../../../../graphql/queries/client/getMissionsClient';
import { PUSH_NOTIFICATION } from '../../../../../../../../../../../../../../../../graphql/mutations/server/pushNotification';

const JobItem = ({ job, index, setProgress }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })

  // state
  const initialState = {
    isUrlComplete: job.url ? true : false,
    isNameComplete: job.name ? true : false,
    isJobItemComplete: job.url && job.name ? true : false
  }

  const [state, dispatch] = React.useReducer(reducer, initialState)

  // mutation
  const [pushNotification] = useMutation(PUSH_NOTIFICATION)
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2, {
    onCompleted({ updateMissionV2 }) {
      setProgress(updateMissionV2.progress)
      // update client

      // update storage
      localStorage.setItem('mission', JSON.stringify(updateMissionV2))
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })
      localStorage.setItem('missions', JSON.stringify(missions))

    }
  })

  const [updateJob] = useMutation(UPDATE_JOB_SERVER, {
    onCompleted({ updateJob }) {
      // update client
      client.writeFragment({
        id: `Job:${updateJob.id}`,
        fragment: gql`
          fragment isComplete on Job {
            isComplete
          }
        `,
        data: {
          isComplete: updateJob.isComplete
        }
      })

      // update mission progress
      const { getJobsByGameId }: any = client.readQuery({ query: GET_JOBS_BY_GAME_ID_CLIENT, variables: { gameId: game.id } })
      const completedJobs = getJobsByGameId
        .filter((job: any) => job.mission10JobsId === mission.id)
        .filter((job: any) => job.isComplete === true)

      if (mission.progress !== completedJobs.length) {
        updateMissionV2({
          variables: {
            id: mission.id,
            field: 'progress',
            data: completedJobs.length
          }
        })

        // push notif list progress
        // const message = mission.progress < completedJobs.length ? 'Your friend added a job offer' : 'Your friend removed a job offer'
        // pushNotification({
        //   variables: {
        //     label: message,
        //     gameId: game.id,
        //     recipientId: game.applicant.id,
        //   }
        // })
      }

      // update storage
      localStorage.setItem('jobs', JSON.stringify(getJobsByGameId))
    }
  })

  // effect
  React.useEffect(() => {
    updateJob({
      variables: {
        id: job.id,
        field: 'isComplete',
        data: state.isJobItemComplete
      }
    })
  }, [updateJob, job.id, state])

  return (
    <>
      <td className='job-item-rank'>{index + 1}</td>
      <JobInputField name='name' value={job.name} jobId={job.id} dispatch={dispatch} />
      <JobInputField name='url' value={job.url} jobId={job.id} dispatch={dispatch} />
      {(player.id === game.applicantId || mission.status === 'completed') && mission.isUnderReview && <JobCheckboxInputField name='isAccepted' value={job.isAccepted} jobId={job.id} />}
    </>
  );
}

export default JobItem;