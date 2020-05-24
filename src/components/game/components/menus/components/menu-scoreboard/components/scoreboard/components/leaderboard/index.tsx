import * as React from 'react';

// components
import ApplicantsTable from './components/applicants-table';
import RecruitersTable from './components/recruiters-table';
import SearchPlayerKpis from './components/search-player-kpis';

// styles
import './styles.css'

const Leaderboard = () => {

  return (
    <div>
      <h4>LEADERBOARD</h4>
      <SearchPlayerKpis />
      <RecruitersTable />
      <ApplicantsTable />
    </div>
  )
};

export default Leaderboard;