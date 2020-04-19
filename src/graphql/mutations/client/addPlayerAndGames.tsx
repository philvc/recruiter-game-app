import gql from 'graphql-tag';

export const ADD_PLAYERANDGAMES_CLIENT = gql`
  mutation addPlayerAndGamesToClient($player: any, $games:any) {
    addPlayer(input: {player: $player, games: $games}) @client{
      player{
        id
        firstName
      },
      games
    }
  }
`