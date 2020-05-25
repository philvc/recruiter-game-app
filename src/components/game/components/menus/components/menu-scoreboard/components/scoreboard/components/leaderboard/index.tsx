import * as React from 'react';

// components
import ApplicantsTable from './components/applicants-table';
import RecruitersTable from './components/recruiters-table';

// styles
import './styles.css'

const Leaderboard = () => {

  return (
    <div>
      <h4 className="leaderboard-title">General rankings</h4>
      <RecruitersTable />
      <ApplicantsTable />
    </div>
  )
};

export default Leaderboard;