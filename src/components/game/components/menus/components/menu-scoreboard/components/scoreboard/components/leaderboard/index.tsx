import * as React from 'react';

// modules
import { useQuery } from '@apollo/client';

// components
import FilterSelect from './components/filter-select';
import ApplicantsTable from './components/applicants-table';

// styles
import './styles.css'

// apollo
import { GET_LEADERBOARD_RESULTS_SERVER } from '../../../../../../../../../../graphql/queries/server/getLeaderboardResultsServer';
import RecruitersTable from './components/recruiters-table';

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
      const recruitersByAcceptedJobsNumber = data?.leaderboardResults.recruiters.slice().sort((a: any, b: any) => {
        return b.acceptedJobsNumber - a.acceptedJobsNumber
      })
      setRecruitersTableData(recruitersByAcceptedJobsNumber)

      // applicants table
      const applicants = data?.leaderboardResults.applicants.slice().sort((a: any, b: any) => {
        return b.appliedJobs - a.appliedJobs
      })
      setApplicantsTableData(applicants)
    }
  }, [data])

  if (loading) return null;
  if (error) return null;

  function handleSelectChange(e: any) {

    setFilter(e.target.value)
    const recruitersByFilter = recruitersTableData.slice().sort((a: any, b: any) => {
      return b[e.target.value] - a[e.target.value]
    })
    setRecruitersTableData(recruitersByFilter)

  }

  return (
    <div>
      <h4>LEADERBOARD</h4>
      <h5>Recruiters</h5>
      <FilterSelect handleSelectChange={handleSelectChange} />
      <RecruitersTable recruiters={recruitersTableData} />
      <ApplicantsTable applicants={applicantsTableData} />
    </div>
  )
};

export default Leaderboard;