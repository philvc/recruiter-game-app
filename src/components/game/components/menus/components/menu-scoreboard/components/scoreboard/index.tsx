import * as React from 'react';

// components
import NavBar from '../../../../../../../navbar';
import ChallengeScoreboard from './components/challenge-scoreboard';
import MissionScoreboard from './components/mission-scoreboard';
import JobsList from './components/jobs-list';
import Leaderboard from './components/leaderboard';


const Scoreboard = ({ path }: any) => {

  return (
    <div>
      <NavBar />
      <div>
        <h3>Scoreboard</h3>
        <ChallengeScoreboard />
        <MissionScoreboard />
        <JobsList />
        <Leaderboard />
      </div>
    </div>
  )
}

export default Scoreboard