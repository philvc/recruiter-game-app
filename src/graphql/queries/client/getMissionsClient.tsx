import gql from 'graphql-tag';

export const GET_MISSIONS_CLIENT = gql`
  query missions($gameId: String){
    missions(input: {gameId: $gameId})@client{
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