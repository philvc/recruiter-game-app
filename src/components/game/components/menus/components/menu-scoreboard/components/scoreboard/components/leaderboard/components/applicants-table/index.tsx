import * as React from 'react';

const ApplicantsTable = ({ applicants }: any) => {
  console.log('applicantsTable render')
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
    </div>
  )
}

export default ApplicantsTable;