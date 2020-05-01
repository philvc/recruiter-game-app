import gql from 'graphql-tag'

export const GET_MISSIONS_ROOT_CLIENT = gql`
  {
    missions @client
  }
`