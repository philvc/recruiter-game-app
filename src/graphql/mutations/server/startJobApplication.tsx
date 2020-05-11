import gql from 'graphql-tag';

export const START_JOB_APPLICATION = gql`
  mutation startJobApplication($missionId: String, $jobId: String, $message: String, $gameId: String, $jobUrl: String, $time: String){
    startJobApplication(input: {
      missionId: $missionId,
      jobId: $jobId,
      gameId: $gameId,
      message: $message,
      jobUrl: $jobUrl,
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
      }
      time
    }
  }
`