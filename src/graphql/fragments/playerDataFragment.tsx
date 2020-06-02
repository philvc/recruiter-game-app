import gql from 'graphql-tag';

export const PLAYER_DATA_FRAGMENT = gql`
  fragment PlayerData on Player {
    id
    email
    playerName
  }
`