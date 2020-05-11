import * as React from 'react'
import { useQuery, useApolloClient, gql, useMutation } from '@apollo/client'
import { GET_ACCEPTED_JOBS_SERVER } from '../../../../../../../../graphql/queries/server/getAcceptedJobs'
import { START_JOB_APPLICATION } from '../../../../../../../../graphql/mutations/server/startJobApplication'
import NavBar from '../../../../../../../navbar';
import NewChallenge from './components/newChallenge';
import PendingChallenge from './components/pendingChallenge';

const Challenge = ({ path }: any) => {
  const client = useApolloClient()
  const { gameId, missionId, mission }: any = client.readQuery({
    query: gql`
     {
       gameId
       missionId
       mission{
         selectedJob {
          id
          url
          missionId
          isAccepted
          rank
          name
          applicationProofUrl
          isComplete
          gameId
         }
         isLocked
         time
         status
       }
     }
    `,
  })
  const { loading, error, data }: any = useQuery(GET_ACCEPTED_JOBS_SERVER, { variables: { gameId } })
  const [startJobApplication] = useMutation(START_JOB_APPLICATION, {
    onCompleted({ startJobApplication }) {
      client.writeQuery({
        query: gql`
        {
          mission
        }`,
        data: {
          mission: startJobApplication,
        }
      })
      localStorage.setItem('mission', JSON.stringify(startJobApplication))
    }
  })
  const [jobList, setJobList] = React.useState([])
  const [selectedJob, setSelectedJob] = React.useState(mission.selectedJob)
  const [selectedDate, setSelectedDate] = React.useState(0)
  const [isDateSelected, setIsDateSelected] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [isChallengeSent, setIsChallengeSent] = React.useState(false)

  React.useEffect(() => {
    if (data?.acceptedJobs) {
      setJobList(data?.acceptedJobs)
    }
    if (mission?.selectedJob) {
      setSelectedJob(mission?.selectedJob)
    }
  }, [data, mission, jobList])

  if (loading) return null;
  if (error) return null;

  function handleChange(e: any) {
    switch (e.target.name) {
      case 'select':
        return setSelectedJob(jobList[e.target.value]);
      case 'date':
        setSelectedDate(e.target.value)
        return setIsDateSelected(true);
      case 'message':
        return setMessage(e.target.value)
      default:
        return null
    }
  }

  function handleClick() {
    const params = {
      missionId,
      jobId: selectedJob.id,
      gameId,
      message,
      jobUrl: selectedJob.url,
      time: selectedDate,
    }
    setIsChallengeSent(true)
    startJobApplication({ variables: params })
  }

  const renderChallenge = (status: string) => {
    switch (status) {
      case 'new':
        return <NewChallenge
          handleChange={handleChange}
          handleClick={handleClick}
          status={mission.status}
          jobList={jobList}
          selectedJob={selectedJob}
          message={message}
          isChallengeSent={isChallengeSent}
          isDateSelected={isDateSelected}
        />;
      case 'pending':
        return <PendingChallenge
          status={mission.status}
          selectedJob={selectedJob}
          missionTime={mission.time}
          missionId={missionId}
        />;
      default:
        return null;
    }
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      Challenge
      {renderChallenge(mission?.status)}
    </div>
  )
}

export default Challenge;