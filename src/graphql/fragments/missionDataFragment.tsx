import gql from 'graphql-tag';

//fragment 
import { JOB_DATA_FRAGMENT } from './jobDataFragment';

export const MISSION_DATA_FRAGMENT = gql`
  fragment MissionData on Mission {
    id
    type
    progress
    isUnderReview
    isRecruiter
    isLocked
    gameId
    status
    isEvaluated
    score
    selectedJob {
      ...JobData
    }
    time
  }
  ${JOB_DATA_FRAGMENT}
`