import * as React from 'react';

// modules
import { useQuery } from '@apollo/client';

// apollo
import { GET_LEADERBOARD_APPLICANTS_SERVER } from '../../../../../../../../../../../../graphql/queries/server/getLeaderboardApplicants';

const ApplicantsTable = () => {

  // state
  const [applicants, setApplicants] = React.useState([])
  const [after, setAfter] = React.useState(0)

  // queries
  const { loading, error, data, fetchMore } = useQuery(GET_LEADERBOARD_APPLICANTS_SERVER, {
    variables: {
      pageSize: 2,
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

  if (loading) return null
  if (error) return null
  return (
    <div>
      <h5>Applicants</h5>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Applied Jobs</th>
          </tr>
          {applicants.map((player: any) => (
            <tr key={`${player.email}-${player.playerName}`}>
              <td>{player.playerName ? player.playerName : player.email}</td>
              <td className='table-data-total'>{player.appliedJobs}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.leaderboardApplicants.hasMore && <button onClick={handleClick}>Load more</button>}
    </div>
  )
}

export default ApplicantsTable;