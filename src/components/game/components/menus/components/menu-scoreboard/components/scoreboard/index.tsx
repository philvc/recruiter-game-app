import * as React from 'react';

// components
import NavBar from '../../../../../../../navbar';
import ChallengeScoreboard from './components/challenge-scoreboard';
import MissionScoreboard from './components/mission-scoreboard';
import JobsList from './components/jobs-list';
import Leaderboard from './components/leaderboard';

// styles
import './styles.css';
import SearchPlayerKpis from './components/leaderboard/components/search-player-kpis';

const Scoreboard = ({ path }: any) => {

  return (
    <div className='scoreboard-container'>
      <NavBar />
      <div>
        <h3 className='scoreboard-body-title'>Scoreboard</h3>
        <div className='scoreboard-body-container'>
          <div className='scoreboard-body-containter-game'>
            <h4 className='scoreboard-body-containter-game-title'>Your game</h4>
            <table>
              <tbody>
                <MissionScoreboard />
                <JobsList />
                <ChallengeScoreboard />
              </tbody>
            </table>
          </div>
          <div className="scoreboard-body-container-leaderboard">
            <Leaderboard />
          </div>
          <div className='scoreboard-body-container-search'>
            <SearchPlayerKpis />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scoreboard