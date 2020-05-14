import * as React from 'react';

const MissionScoreboard = ({ missions }: any) => {

  const total = missions.length;
  const averageScore = missions.map((mission: any) => mission.score).reduce((a: any, b: any) => a + b, 0) / total

  return (
    <div>
      <h4>MISSIONS</h4>
      <p>Total: {total}</p>
      <p>Average per mission: {averageScore}/10</p>
    </div>
  )
}

export default MissionScoreboard;