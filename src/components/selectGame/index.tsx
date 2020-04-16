import * as React from 'react';

// packages
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const GAMES = gql`
  query GamesByPlayerId($id: String!){
    gamesByPlayerId(id: $id) {
      id
      title
    }
  }
`

const SelectGame = ({ path, playerId }: any) => {

  const { loading, error, data } = useQuery(GAMES, {
    variables: {
      id: playerId
    }
  })

  if (loading) return <div>Loading games</div>
  if (error) return <div>Error </div>

  return (
    <div>
      {playerId} Games
      <ul>
        {data && data.gamesByPlayerId ? (
          data.gamesByPlayerId.map((game: any) => <li key={game.id}>{game.title}</li>)
        ) :
          null
        }
      </ul>
    </div>

  )
}

export default SelectGame;