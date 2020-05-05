import gql from 'graphql-tag';

export const GET_MISSIONS_SERVER = gql`
  query missions($gameId: String){
    missions(input: {gameId: $gameId}){
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
    }
  }
`