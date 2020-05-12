import * as React from 'react';
import JobInputField from './components/job-input-field';
import JobCheckboxInputField from './components/job-checkbox-input-field';

const JobItem = ({ job, index }: any) => {
  console.log('job', job)
  return (
    <div>
      <span>{index + 1}</span>
      <span>{job.id}</span>
      <JobInputField name='url' value={job.url} jobId={job.id} />
      <JobInputField name='name' value={job.name} jobId={job.id} />
      <JobCheckboxInputField name='isAccepted' value={job.isAccepted} jobId={job.id} />
    </div>
  );
}

export default JobItem;