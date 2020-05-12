import gql from 'graphql-tag';

export const ADD_LIST10JOBOFFERSMISSION_SERVER = gql`
  mutation addList10JobOffersMission($type: String, $gameId: String){
    addList10JobOffersMission(input: {type: $type, gameId: $gameId}){
      mission {
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
  }
`