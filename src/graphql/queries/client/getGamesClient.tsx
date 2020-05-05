import gql from 'graphql-tag';

export const GET_GAMES_ClIENT = gql`
  {
    games @client{
      id
      title
      recruiterId
      applicantId
    }
  }
`