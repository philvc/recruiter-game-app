import * as React from 'react';

const RecruitersTable = ({ recruiters }: any) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Total jobs validated</th>
            <th>Total applicants</th>
          </tr>
          {recruiters.map((player: any) => (
            <tr key={`${player.email}-${player.playerName}`}>
              <td>{player.playerName ? player.playerName : player.email}</td>
              <td className='table-data-total'>{player.acceptedJobsNumber}</td>
              <td className='table-data-total'>{player.applicantsNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default RecruitersTable;