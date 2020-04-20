import gql from 'graphql-tag';

export const GET_PLAYER = gql`
  query getId {
    id @client
    firstName @client
  }
`