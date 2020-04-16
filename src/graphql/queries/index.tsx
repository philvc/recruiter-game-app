import { gql } from 'apollo-boost';

export const GET_GAMES = gql`
  query getGames($id: String!){
    games(input: {id: $id}) {
      id
      title
    }
  }
`