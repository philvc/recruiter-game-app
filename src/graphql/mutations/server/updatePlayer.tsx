import gql from 'graphql-tag';

export const UPDATE_PLAYER_SERVER = gql`
  mutation updatePlayer($email: String, $playerName:String, $id:String){
    updatePlayer(input: {email: $email, playerName: $playerName, id: $id}){
      player{
        id
        email
        playerName
      }
    }
  }
`