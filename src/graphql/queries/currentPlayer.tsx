import { gql } from 'apollo-boost';

export default gql`
  {
    player @client{
      id
      firstName
      lastName
      email
      _typename
    }

  }
`