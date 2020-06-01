import gql from 'graphql-tag';

// fragment
import { JOB_DATA_FRAGMENT } from '../../fragments/jobDataFragment';

export const GET_JOB_SERVER = gql`
  query getJob($jobId: String){
    job(input: {jobId: $jobId}){
      ...JobData
    }
  }
  ${JOB_DATA_FRAGMENT}
`