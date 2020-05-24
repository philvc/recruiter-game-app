import * as React from 'react';

// modules
import { useQuery } from '@apollo/client';

// modules
import FilterSelect from '../filter-select';

// apollo
import { GET_LEADERBOARD_RECRUITERS_SERVER } from '../../../../../../../../../../../../graphql/queries/server/getleaderboardRecruiters';

const RecruitersTable = () => {

  // state
  const [recruiters, setRecruiters] = React.useState([])
  const [after, setAfter] = React.useState(0)
  const [filter, setFilter] = React.useState('acceptedJobsNumber')

  // queries
  const { loading, error, data, fetchMore } = useQuery(GET_LEADERBOARD_RECRUITERS_SERVER, {
    variables: {
      rankFilter: filter,
      pageSize: 2,
      after: 0,
    },
  })


  // effects
  React.useEffect(() => {

    if (data) {

      setRecruiters(data.leaderboardRecruiters.leaderboardRecruiters)
      setAfter(data.leaderboardRecruiters.cursor)
    }
  }, [data])

  // handlers
  function handleSelectChange(e: any) {

    setFilter(e.target.value)

  }

  function handleClick(e: any) {
    if (data) {
      fetchMore({
        variables: {
          after,
        },
        // update cache avec updateQuery
        updateQuery: (prev: any, { fetchMoreResult, ...rest }: any) => {
          if (!fetchMoreResult) return prev;
          console.log('fetchMoreResult', fetchMoreResult)
          return {
            ...fetchMoreResult,
            leaderboardRecruiters: {
              ...fetchMoreResult.leaderboardRecruiters,
              leaderboardRecruiters: [
                ...prev.leaderboardRecruiters.leaderboardRecruiters,
                ...fetchMoreResult.leaderboardRecruiters.leaderboardRecruiters,
              ]
            }

          }
        }
      })
    }
  }


  return (
    <div>
      <h5>Recruiters</h5>
      <FilterSelect handleSelectChange={handleSelectChange} />
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Total jobs validated</th>
            <th>Total applicants</th>
          </tr>
          {recruiters.map((player: any) => (
            <tr key={`${player.email}-${player.playerName}`}>
              <td>{player.playerName ? player.playerName : player.email}</td>
              <td className='table-data-total'>{player.acceptedJobsNumber}</td>
              <td className='table-data-total'>{player.applicantsNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.leaderboardRecruiters.hasMore && <button onClick={handleClick}>Load more recruiters</button>}
    </div>
  )
}

export default RecruitersTable;