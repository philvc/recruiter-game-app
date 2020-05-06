import * as React from 'react'
import { useQuery, useApolloClient, gql } from '@apollo/client'
import { GET_ACCEPTED_JOBS_SERVER } from '../../../../../../../../graphql/queries/server/getAcceptedJobs'

const Challenge = ({ path }: any) => {
  const client = useApolloClient()
  const { gameId }: any = client.readQuery({
    query: gql`
     {
       gameId
     }
    `,
  })
  const { loading, error, data } = useQuery(GET_ACCEPTED_JOBS_SERVER, { variables: { gameId } })
  const [jobList, setJobList] = React.useState([])
  const [selectedJob, setSelectedJob] = React.useState({ url: '', name: '', rank: null })
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [selectedTime, setSelectedTime] = React.useState()

  React.useEffect(() => {
    if (data?.acceptedJobs) {
      setJobList(data?.acceptedJobs)
    }
  }, [data])

  if (loading) return null;
  if (error) return null;

  function handleChange(e: any) {
    console.log('e value', typeof e.target.value, e.target.name)
    switch (e.target.name) {
      case 'select':
        return setSelectedJob(jobList[e.target.value]);
      case 'date':
        console.log('radio value', parseInt(e.target.value, 10));
        return setSelectedDate(new Date(parseInt(e.target.value, 10)))
      default:
        return null
    }

  }

  return (
    <div>
      Challenge
      <div>
        <p>Step 1: select 1 job </p>
        <select name='select' style={{ width: '100px' }} onChange={handleChange}>
          <option></option>
          {jobList.map((job: any, index: number) => <option value={index} key={job.id}>{job.url} rank:{job.rank}</option>)}
        </select>
        <p>
          <img style={selectedJob.url && isLoaded ? {} : { display: 'none' }} src='https://media.giphy.com/media/1jkV5ifEE5EENHESRa/giphy.gif' alt='giphy video' onLoad={() => setIsLoaded(true)} />
        </p>
        {selectedJob.url && (
          <div>
            <p>{selectedJob.url}</p>
            <p>Step 2: Choose a deadline, deadline are fun !</p>
            <div>
              <label>
                <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 1)} onClick={handleChange} />Tomorrow
              </label>
              <label>
                <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 2)} onClick={handleChange} />After tomorrow
              </label>
              <label>
                <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 3)} onClick={handleChange} />After after tomorrow
              </label>
              <p>
                <label>
                  <input type='time' name='time' />
                </label>
              </p>
            </div>
          </div>
        )}
        {selectedDate.getDay() !== new Date().getDay() && (
          <p>{selectedDate.toString()}</p>
        )}

      </div>
    </div>
  )
}

export default Challenge