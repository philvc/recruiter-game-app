import gql from 'graphql-tag';

export const GET_JOBS_CLIENT = gql`
  query jobs($missionId: String){
    jobs(input: {missionId: $missionId})@client{
      id
      name
      url
      rank
      isComplete
    }
  }
`