import gql from 'graphql-tag';

export const SEND_REVIEW_REQUEST = gql`
  mutation sendReviewRequest($missionId: String, $gameId:String){
    sendReviewRequest(input: {missionId:$missionId, gameId: $gameId}){
      id
      type
      progress
      isReviewed
      isRecruiter
      isLocked
      gameId
      status
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