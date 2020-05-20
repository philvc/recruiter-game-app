import * as React from 'react';

const ChallengeScoreboard = ({ challenges }: any) => {
  const totalSucceeded = challenges.filter((challenge: any) => challenge.score).length
  const totalFailed = challenges.filter((challenge: any) => !challenge.score).length
  return (
    <div>
      <h4>CHALLENGES</h4>
      <p>Challenge succeeded: {totalSucceeded}</p>
      <p>Challenge failed: {totalFailed}</p>
    </div>
  )
}

export default ChallengeScoreboard;