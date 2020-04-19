import { gql } from 'apollo-boost';


export const GET_GAMES_ClIENT = gql`
  query Games {
    Game @client {
      id
      title
    }
  }
`