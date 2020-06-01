import gql from 'graphql-tag';

// fragment 
import { MISSION_DATA_FRAGMENT } from '../../fragments/missionDataFragment';

export const START_JOB_APPLICATION = gql`
  mutation startJobApplication($missionId: String, $jobId: String,  $gameId: String, $time: String){
    startJobApplication(input: {
      missionId: $missionId,
      jobId: $jobId,
      gameId: $gameId,
      time: $time
    }){
      ...MissionData
    }
  }
  ${MISSION_DATA_FRAGMENT}
`