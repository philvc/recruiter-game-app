import gql from 'graphql-tag';

// fragment
import { JOB_DATA_FRAGMENT } from '../../fragments/jobDataFragment';

export const CREATE_JOBS = gql`
  mutation createJobs($quantity: Int, $missionType: String, $missionId: String, $gameId: String){
    createJobs(input: {quantity: $quantity, missionType: $missionType, missionId: $missionId, gameId: $gameId}){
      ...JobData
    }
  }
  ${JOB_DATA_FRAGMENT}
`