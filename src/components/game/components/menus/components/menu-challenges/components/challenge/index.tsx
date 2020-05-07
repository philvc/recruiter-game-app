import * as React from 'react'
import { useQuery, useApolloClient, gql, useMutation } from '@apollo/client'
import { GET_ACCEPTED_JOBS_SERVER } from '../../../../../../../../graphql/queries/server/getAcceptedJobs'
import { START_JOB_APPLICATION } from '../../../../../../../../graphql/mutations/server/startJobApplication'
import { calculateCountDown } from './helper';
import ApplicationProofModal from '../../../menu-missions/components/mission/components/jobOffers/components/table/components/jobRow/components/application-proof-modal';
import { GET_JOB_SERVER } from '../../../../../../../../graphql/queries/server/getJob';

const Challenge = ({ path }: any) => {
  const client = useApolloClient()
  const { gameId, missionId, mission }: any = client.readQuery({
    query: gql`
     {
       gameId
       missionId
       mission{
         selectedJob
         isLocked
         time
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
  const [selectedJob, setSelectedJob] = React.useState({ id: '', url: '', name: '', rank: null, applicationProofUrl: '' })
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState(0)
  const [isDateSelected, setIsDateSelected] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [countdown, setCountDown] = React.useState('')

  React.useEffect(() => {
    if (data?.acceptedJobs) {
      setJobList(data?.acceptedJobs)
    }
    if (mission?.selectedJob) {
      const job: any = jobList.filter((job: any) => job.id === mission.selectedJob)[0]
      setSelectedJob(job)
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
    startJobApplication({ variables: params })
  }

  const pendingJob: any = jobList.filter((job: any) => job.id === mission.selectedJob)[0]

  if (countdown !== 'EXPIRED') {
    console.log('missiontime', mission.time)
    calculateCountDown(parseInt(mission.time, 10), setCountDown)

  }

  return (
    <div>
      Challenge
      <div>
        <p>Step 1: select 1 job </p>
        {mission.isLocked && mission.selectedJob ? (
          <select name='select' value={mission.selectedJob}>
            <option >{selectedJob?.url}</option>
          </select>
        )
          :
          (
            <select name='select' style={{ width: '100px' }} onChange={handleChange}>
              <option></option>
              {jobList.map((job: any, index: number) => <option value={index} key={job.id}>{job.url} rank:{job.rank}</option>)}
            </select>
          )
        }
        {
          mission.isLocked && pendingJob && <p><a href={pendingJob.url}> {pendingJob.url}</a></p>
        }
        {mission.isLocked && <p>{countdown}</p>}
        {mission.isLocked && (
          <ApplicationProofModal
            applicationProofUrl={selectedJob?.applicationProofUrl}
            jobId={selectedJob?.id}
            missionId={missionId}
          />
        )}
        {!mission.isLocked && <p>
          <img style={selectedJob?.url && isLoaded ? {} : { display: 'none' }} src='https://media.giphy.com/media/1jkV5ifEE5EENHESRa/giphy.gif' alt='giphy video' onLoad={() => setIsLoaded(true)} />
        </p>}
        {!mission.isLocked && selectedJob?.url && (
          <div>
            <p>{selectedJob?.url}</p>
            <p>Step 2: Choose a deadline, deadline are fun !</p>
            <div>
              <label>
                <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 1)} onClick={handleChange} />24H
              </label>
              <label>
                <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 2)} onClick={handleChange} />48H
              </label>
              <label>
                <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 3)} onClick={handleChange} />72H
              </label>
            </div>
          </div>
        )}
        {!mission.isLocked && isDateSelected && (
          <div>
            <p>Last step: Send your message</p>
            <input type='texteArea' name='message' value={message} onChange={handleChange} />
            <p><button onClick={handleClick}>Send challenge</button></p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Challenge;