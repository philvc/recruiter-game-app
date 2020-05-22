import * as React from 'react';

// modules
import { useQuery } from '@apollo/client';

// components
import FilterSelect from './components/filter-select';

// styles
import './styles.css'

// apollo
import { GET_LEADERBOARD_RESULTS_SERVER } from '../../../../../../../../../../graphql/queries/server/getLeaderboardResultsServer';

const Leaderboard = () => {

  // state
  const [recruitersTableData, setRecruitersTableData] = React.useState([])
  const [applicantsTableData, setApplicantsTableData] = React.useState([])
  const [filter, setFilter] = React.useState('acceptedJobsNumber')

  // queries
  const { loading, error, data } = useQuery(GET_LEADERBOARD_RESULTS_SERVER, {
    fetchPolicy: "no-cache",
  })

  // effect
  React.useEffect(() => {

    if (data) {

      // recruiters table
      const recruitersByFilter = data?.leaderboardResults.recruiters.slice().sort((a: any, b: any) => {
        return b[filter] - a[filter]
      })
      setRecruitersTableData(recruitersByFilter)

      // applicants table
      const applicants = data?.leaderboardResults.applicants.slice().sort((a: any, b: any) => {
        return b.appliedJobs - a.appliedJobs
      })
      setApplicantsTableData(applicants)
    }
  }, [data, filter])

  if (loading) return null;
  if (error) return null;

  function handleSelectChange(e: any) {

    setFilter(e.target.value)
  }

  return (
    <div>
      <h4>LEADERBOARD</h4>
      <h5>Recruiters</h5>
      <FilterSelect handleSelectChange={handleSelectChange} />
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Total jobs validated</th>
            <th>Total applicants</th>
          </tr>
          {recruitersTableData.map((player: any) => (
            <tr key={`${player.email}-${player.playerName}`}>
              <td>{player.playerName ? player.playerName : player.email}</td>
              <td className='table-data-total'>{player.acceptedJobsNumber}</td>
              <td className='table-data-total'>{player.applicantsNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h5>Applicants</h5>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Applied Jobs</th>
          </tr>
          {applicantsTableData.map((player: any) => (
            <tr key={`${player.email}-${player.playerName}`}>
              <td>{player.playerName ? player.playerName : player.email}</td>
              <td className='table-data-total'>{player.appliedJobs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default Leaderboard;