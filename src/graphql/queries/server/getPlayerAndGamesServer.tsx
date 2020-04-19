import { gql } from 'apollo-boost';

export const GET_PLAYERANDGAMES_SERVER = gql`
  query getPlayerAndGames($email: String!) {
    player (input: {email: $email}){
      id
      firstName
      lastName
      email
    }
    games(input: {email: $email}) {
      id
      title
      applicantId
      recruiterId
    }
  }
`

