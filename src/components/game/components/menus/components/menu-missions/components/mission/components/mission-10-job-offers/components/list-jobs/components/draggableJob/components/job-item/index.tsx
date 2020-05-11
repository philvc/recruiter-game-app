import * as React from 'react';

const JobItem = ({ job, index }: any) => {
  return (
    <div>
      <span>{index + 1}</span>
      <span>{job.id}</span>
      {/* <input name='url' value={state.url} onChange={handleChange} />
      {player.id === game.applicantId &&
        (<label>
          <input type='checkbox' name="isAccepted" onChange={handleChange} checked={state.isAccepted} />
        </label>)
      } */}
    </div>
  );
}

export default JobItem;