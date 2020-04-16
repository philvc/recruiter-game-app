import { gql } from 'apollo-boost';

export const LOGIN_MUTATION = gql`
  mutation login($email: String) {
    login(email: $email){
      id
      firstName
      lastName
      email
    }
  }
`