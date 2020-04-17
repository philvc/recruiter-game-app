import { gql } from 'apollo-boost';

export const GET_GAMES = gql`
  query getGames($id: String!){
    games(input: {id: $id}) {
      id
      title
    }
  }
`

export const GET_GAMES_CACHE = gql`
  query Games {
    Game @client {
      id
      title
    }
  }
`


export const GET_ACCOUNT = gql`
  query getAccount($email: String!) {
    player(input: {email: $email}){
      player {
        id
        firstName
        lastName
        email
      }
      games {
        id
        title
        applicantId
        recruiterId
      }
    }
  }
`