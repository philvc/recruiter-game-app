import * as React from 'react';

// modules
import { useQuery } from '@apollo/client';

// components
import FilterSelect from './components/filter-select';
import ApplicantsTable from './components/applicants-table';
import RecruitersTable from './components/recruiters-table';
import SearchPlayerKpis from './components/search-player-kpis';

// styles
import './styles.css'

// apollo
import { GET_LEADERBOARD_RESULTS_SERVER } from '../../../../../../../../../../graphql/queries/server/getLeaderboardResultsServer';
import { GET_LEADERBOARD_RECRUITERS_SERVER } from '../../../../../../../../../../graphql/queries/server/getleaderboardRecruiters';

const Leaderboard = () => {

  // state
  const [recruitersTableData, setRecruitersTableData] = React.useState([])
  const [applicantsTableData, setApplicantsTableData] = React.useState([])
  const [filter, setFilter] = React.useState('acceptedJobsNumber')
  const [after, setAfter] = React.useState(0)

  // queries
  // const { loading, error, data } = useQuery(GET_LEADERBOARD_RESULTS_SERVER, {
  //   fetchPolicy: "no-cache",
  // })

  const { loading, error, data, fetchMore } = useQuery(GET_LEADERBOARD_RECRUITERS_SERVER, {
    variables: {
      rankFilter: filter,
      pageSize: 2,
    },
  })

  // effect


  React.useEffect(() => {
    // essai pagination recruiters table
    console.log(' query data result', data)
    if (data) {
      // const recruitersByAcceptedJobsNumber = data?.leaderboardRecruiters.slice().sort((a: any, b: any) => {
      //   return b.acceptedJobsNumber - a.acceptedJobsNumber
      // })
      setRecruitersTableData(data.leaderboardRecruiters.leaderboardRecruiters)
      setAfter(data.leaderboardRecruiters.cursor)
      // recruiters table
      // const recruitersByAcceptedJobsNumber = data?.leaderboardResults.recruiters.slice().sort((a: any, b: any) => {
      //   return b.acceptedJobsNumber - a.acceptedJobsNumber
      // })
      // setRecruitersTableData(recruitersByAcceptedJobsNumber)

      // applicants table
      // const applicants = data?.leaderboardResults.applicants.slice().sort((a: any, b: any) => {
      //   return b.appliedJobs - a.appliedJobs
      // })
      // setApplicantsTableData(applicants)
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
          after: data.leaderboardRecruiters.cursor,
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

  if (loading) return null;
  if (error) return null;



  return (
    <div>
      <h4>LEADERBOARD</h4>
      <SearchPlayerKpis />
      <h5>Recruiters</h5>
      <FilterSelect handleSelectChange={handleSelectChange} />
      <RecruitersTable recruiters={recruitersTableData} />
      {data?.leaderboardRecruiters.hasMore && <button onClick={handleClick}>Load more recruiters</button>}
      {/* <ApplicantsTable applicants={applicantsTableData} /> */}
    </div>
  )
};

export default Leaderboard;