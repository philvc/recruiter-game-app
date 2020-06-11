import gql from 'graphql-tag';

// fragment
import { GAME_DATA_FRAGMENT } from '../../fragments/gameDataFragment';

export const GET_GAMES_CLIENT = gql`
  query getGamesClient($playerId: String){
    games(input: {playerId:$playerId}) @client{
      ...GameData
    }
  }
  ${GAME_DATA_FRAGMENT}
` 