import gql from 'graphql-tag';

export const GET_JOBS_BY_GAME_ID = gql`
  query getJobsByGameId($gameId: String){
    getJobsByGameId(input: {gameId: $gameId}){
      id
      name
      url
      missionId
      rank
      applicationProofUrl
      isComplete
      isAccepted
      gameId
      isApplied
      isSelected
      mission10JobsId
      missionJobApplicationId
    }
  }
`