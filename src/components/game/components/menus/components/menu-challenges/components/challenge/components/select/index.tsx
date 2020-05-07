import * as React from 'react';

const Select = ({ handleChange, status, jobList, selectedJob }: any) => {
  return (
    <div>
      {status === 'new' ?
        (
          <select name='select' style={{ width: '100px' }} onChange={handleChange}>
            <option></option>
            {jobList?.map((job: any, index: number) => <option value={index} key={job.id}>{job.url} rank:{job.rank}</option>)}
          </select>
        )
        : status === 'pending' ?
          (
            <select name='select' value={selectedJob}>
              <option >{selectedJob?.url}</option>
            </select>
          )
          :
          null
      }
    </div>
  )
}

export default Select;