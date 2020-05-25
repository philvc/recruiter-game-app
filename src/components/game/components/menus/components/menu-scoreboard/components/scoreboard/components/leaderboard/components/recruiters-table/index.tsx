import * as React from 'react';

// modules
import { useQuery } from '@apollo/client';

// modules
import SortSelect from '../sort-select';

// apollo
import { GET_LEADERBOARD_RECRUITERS_SERVER } from '../../../../../../../../../../../../graphql/queries/server/getleaderboardRecruiters';

// styles
import './styles.css';

const RecruitersTable = () => {

  // state
  const [recruiters, setRecruiters] = React.useState([])
  const [after, setAfter] = React.useState(0)
  const [filter, setFilter] = React.useState('acceptedJobsNumber')
  const [hoveredPlayerIndex, setHoveredPlayerIndex] = React.useState('')

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

  function handleHover(e: any, index: any) {
    setHoveredPlayerIndex(index)
  }

  function handleBlur(e: any, index: any) {
    setHoveredPlayerIndex('')
  }


  return (
    <div>
      {/* <h5>Recruiters</h5> */}
      <SortSelect handleSelectChange={handleSelectChange} />
      <table>
        <tbody>
          <tr>
            {/* <th className="leaderboard-table-header">Rank</th> */}
            <th className="leaderboard-table-header">Recruiters</th>
            {/* <th className="leaderboard-table-header">Total jobs validated</th>
            <th className="leaderboard-table-header">Total applicants</th> */}
          </tr>
          {recruiters.map((player: any, index: any) => (
            <tr key={`${player.email}-${player.playerName}`}>
              <td className='leaderboard-table-data'>{index + 1}</td>
              <td
                className='leaderboard-table-data'
                onMouseEnter={(e: any) => handleHover(e, index)}
                onMouseLeave={(e: any) => handleBlur(e, index)}
              >
                {player.playerName ? player.playerName : player.email}
              </td>
              {hoveredPlayerIndex === index && <div className='leaderboard-player-details'>
                <div className='leaderboard-player-details-total'>
                  total number of accepted jobs: {player.acceptedJobsNumber}
                </div>
                <div className='leaderboard-player-details-total'>
                  total number of applicants: {player.applicantsNumber}
                </div>
              </div>}
              {/* <td className='leaderboard-table-data'>{player.acceptedJobsNumber}</td>
              <td className='leaderboard-table-data'>{player.applicantsNumber}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {data?.leaderboardRecruiters.hasMore && <button onClick={handleClick}>Load more recruiters</button>}
    </div>
  )
}

export default RecruitersTable;