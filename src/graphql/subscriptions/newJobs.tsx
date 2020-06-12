import gql from 'graphql-tag';

// fragment
import { JOB_DATA_FRAGMENT } from '../fragments/jobDataFragment';

export const NEW_JOBS_SUBSCRIPTION = gql`
  subscription onNewJobs($playerId: String){
    newJobs(input: {playerId: $playerId}){
      ...JobData
    }
  }
  ${JOB_DATA_FRAGMENT}
`