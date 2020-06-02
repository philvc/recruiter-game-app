import gql from 'graphql-tag';

// fragment
import { GAME_DATA_FRAGMENT } from '../../fragments/gameDataFragment';
export const UPDATE_GAME_SERVER = gql`
  mutation updateGame($id: String, $field: String, $data: StringOrIntOrBoolean){
    updateGame(input: {id: $id, field: $field, data: $data}){
      ...GameData
    }
  }
  ${GAME_DATA_FRAGMENT}
`