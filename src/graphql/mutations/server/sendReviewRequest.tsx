import gql from 'graphql-tag';

export const SEND_REVIEW_REQUEST = gql`
  mutation sendReviewRequest($missionId: String, $gameId:String){
    sendReviewRequest(input: {missionId:$missionId, gameId: $gameId}){
      id
      isReviewed
      status
      progress
    }
  }
`