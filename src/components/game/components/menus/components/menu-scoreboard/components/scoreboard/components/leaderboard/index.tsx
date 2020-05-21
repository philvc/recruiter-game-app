import * as React from 'react';

// modules
import { useQuery } from '@apollo/client';

// styles
import './styles.css'

// apollo
import { GET_LEADERBOARD_RESULTS_SERVER } from '../../../../../../../../../../graphql/queries/server/getLeaderboardResultsServer';
import FilterSelect from './components/filter-select';

const Leaderboard = () => {

  // state
  const [tableData, setTableData] = React.useState([])
  const [filter, setFilter] = React.useState('acceptedJobsNumber')

  // queries
  const { loading, error, data } = useQuery(GET_LEADERBOARD_RESULTS_SERVER, {
    fetchPolicy: "no-cache",
  })

  // effect
  React.useEffect(() => {

    if (data) {
      const dataByFilter = data?.leaderboardResults.slice().sort((a: any, b: any) => {
        return b[filter] - a[filter]
      })
      setTableData(dataByFilter)
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
          {tableData.map((player: any) => (
            <tr key={`${player.email}-${player.playerName}`}>
              <td>{player.playerName ? player.playerName : player.email}</td>
              <td className='table-data-total'>{player.acceptedJobsNumber}</td>
              <td className='table-data-total'>{player.applicantsNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default Leaderboard;