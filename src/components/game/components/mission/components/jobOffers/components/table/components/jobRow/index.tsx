import * as React from 'react';


const JobRow = ({ job, index, handleChange }: any) => {

  return (
    <div>
      <input name='url' value={job.url} onChange={(e) => handleChange(e, index, job)} />
      <input name='name' value={job.name} onChange={(e) => handleChange(e, index, job)} />
    </div>
  )
}

export default JobRow;