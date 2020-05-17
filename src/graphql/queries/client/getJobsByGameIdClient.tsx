import gql from 'graphql-tag';

export const GET_JOBS_BY_GAME_ID_CLIENT = gql`
  query getJobsByGameIdClient($gameId: String){
    getJobsByGameId(input: {gameId: $gameId}) @client {
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

