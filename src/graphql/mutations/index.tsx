import { gql } from 'apollo-boost';

export const LOGIN_MUTATION = gql`
  mutation login($email: String) {
    login(input: {email: $email}){
      id
      firstName
      lastName
      email
    }
  }
`

export const ADDGAME_MUTATION = gql`
  mutation addGame($title: String){
    addGame(input: {title: $title}){
      id
      title
    }
  }
`