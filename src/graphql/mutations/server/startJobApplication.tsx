import gql from 'graphql-tag';

export const START_JOB_APPLICATION = gql`
  mutation startJobApplication($missionId: String, $jobId: String,  $gameId: String, $time: String){
    startJobApplication(input: {
      missionId: $missionId,
      jobId: $jobId,
      gameId: $gameId,
      time: $time
    }){
      id
      type
      progress
      gameId
      isReviewed
      isRecruiter
      isLocked
      status
      score
      isEvaluated
      score
      selectedJob {
        id
        url
        missionId
        isAccepted
        rank
        name
        applicationProofUrl
        isComplete
        gameId
        isSelected
        isApplied
      }
      time
    }
  }
`