import gql from 'graphql-tag';

// fragment
import { JOB_DATA_FRAGMENT } from '../fragments/jobDataFragment';

export const UPDATED_JOB_SUBSCRIPTION = gql`
  subscription onUpdatedJob($gameId: String){
    updatedJob(input: {gameId: $gameId}){
      ...JobData
    }
  }
  ${JOB_DATA_FRAGMENT}
`