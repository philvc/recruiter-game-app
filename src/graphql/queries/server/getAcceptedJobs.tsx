import gql from 'graphql-tag'

export const GET_ACCEPTED_JOBS_SERVER = gql`
  query getAcceptedJobs($gameId: String){
    acceptedJobs(input: {gameId: $gameId}){
      id
      name
      url
      missionId
      rank
      applicationProofUrl
      isComplete
      isAccepted
      gameId
      isSelected
      isApplied
    }
  }
`