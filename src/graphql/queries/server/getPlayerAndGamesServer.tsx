import gql from 'graphql-tag';

export const GET_PLAYERANDGAMES_SERVER = gql`
  query getPlayerAndGamesServer($email: String!) {
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

