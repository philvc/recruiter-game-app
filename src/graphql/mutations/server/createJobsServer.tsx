import gql from 'graphql-tag';

export const CREATE_JOBS = gql`
  mutation createJobs($quantity: Int, $missionType: String, $missionId: String, $gameId: String){
    createJobs(input: {quantity: $quantity, missionType: $missionType, missionId: $missionId, gameId: $gameId}){
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