import * as React from 'react';

const AppliedJobs = ({ appliedJobs }: any) => {

  return (
    <div>
      <h4>Applied Jobs: </h4>
      <ul>
        {appliedJobs.map((job: any) => <li key={job.id}>{job.name} url: {job.url}</li>)}
      </ul>
    </div>
  )
}

export default AppliedJobs;