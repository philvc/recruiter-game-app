import gql from 'graphql-tag';

export const GET_PLAYERANDGAMES_CLIENT = gql`
  query getPlayerAndGamesClient($email: string) {
    player (input: {email: $email})@client{
      id
      firstName
      lastName
      email
    }
    games(input: {email: $email})@client{
      id
      title
      applicantId
      recruiterId
    }
  }
`