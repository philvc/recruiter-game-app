import gql from 'graphql-tag';

export const GET_JOBS_SERVER = gql`
  query jobs($missionId: String){
    jobs(input: {missionId: $missionId}){
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
    } 
  }
`