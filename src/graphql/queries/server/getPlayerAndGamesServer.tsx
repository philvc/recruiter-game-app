import gql from 'graphql-tag';

export const GET_PLAYERANDGAMES_SERVER = gql`
  query getPlayerAndGamesServer($email: String!) {
    player (input: {email: $email}){
      id
      email
      playerName
    }
    games(input: {email: $email}) {
      id
      title
      applicantId
      recruiterId
    }
  }
`

