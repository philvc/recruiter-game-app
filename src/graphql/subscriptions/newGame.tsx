import gql from 'graphql-tag';

// fragment
import { GAME_DATA_FRAGMENT } from '../fragments/gameDataFragment';


export const NEW_GAME_SUBSCRIPTION = gql`
 subscription onNewGame($playerId: String){
  newGame(input: {playerId: $playerId}){
    ...GameData
  }
 }
 ${GAME_DATA_FRAGMENT}
`