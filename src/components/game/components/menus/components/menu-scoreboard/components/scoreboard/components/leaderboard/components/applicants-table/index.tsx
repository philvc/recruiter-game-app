import * as React from 'react';

// modules
import { useQuery } from '@apollo/client';

// styles
import './styles.css';

// apollo
import { GET_LEADERBOARD_APPLICANTS_SERVER } from '../../../../../../../../../../../../graphql/queries/server/getLeaderboardApplicants';

const ApplicantsTable = () => {

  // state
  const [applicants, setApplicants] = React.useState([])
  const [after, setAfter] = React.useState(0)
  const [hoveredPlayerIndex, setHoveredPlayerIndex] = React.useState('')


  // queries
  const { loading, error, data, fetchMore } = useQuery(GET_LEADERBOARD_APPLICANTS_SERVER, {
    variables: {
      pageSize: 10,
      rankFilter: 'appliedJobs',
      after: 0,
    }
  })

  // effects
  React.useEffect(() => {

    if (data) {

      setApplicants(data.leaderboardApplicants.leaderboardApplicants)
      setAfter(data.leaderboardApplicants.cursor)

    }
  }, [data])

  // handlers
  function handleClick(e: any) {
    fetchMore({
      variables: {
        after,
      },
      updateQuery: (prev: any, { fetchMoreResult, ...rest }: any) => {
        if (!fetchMoreResult) return prev;

        return {
          ...fetchMoreResult,
          leaderboardApplicants: {
            ...fetchMoreResult.leaderboardApplicants,
            leaderboardApplicants: [
              ...prev.leaderboardApplicants.leaderboardApplicants,
              ...fetchMoreResult.leaderboardApplicants.leaderboardApplicants,
            ]
          }

        }
      }
    })
  }

  function handleHover(e: any, index: any) {
    setHoveredPlayerIndex(index)
  }

  function handleBlur(e: any, index: any) {
    setHoveredPlayerIndex('')
  }

  if (loading) return null
  if (error) return null
  return (
    <div>
      {/* <h5>Applicants</h5> */}
      <table>
        <tbody>
          <tr>
            <th className='leaderboard-table-header'>Applicants</th>
          </tr>
          {applicants.map((player: any, index: any) => (
            <tr key={`${player.email}-${player.playerName}`}>
              <td className='leaderboard-table-data'>{index + 1}</td>
              <td
                className='leaderboard-table-data'
                onMouseEnter={(e: any) => handleHover(e, index)}
              >
                {player.playerName ? player.playerName : player.email}
              </td>
              {hoveredPlayerIndex === index && <div className='leaderboard-applicant-details'>
                <div className='leaderboard-player-details-total-applied-jobs'>
                  total number applied jobs: {player.appliedJobs}
                </div>
                <div className='leaderboard-player-details-close' onClick={(e: any) => handleBlur(e, index)}>X</div>
              </div>
              }
            </tr>
          ))}
        </tbody>
      </table>
      {data?.leaderboardApplicants.hasMore && <button onClick={handleClick}>Load more</button>}
    </div>
  )
}

export default ApplicantsTable;