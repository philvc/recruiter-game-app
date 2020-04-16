import * as React from 'react';

// packages
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// components
import AddGame from './components/addGame';

// style
import './style.css';

// context
import { PlayerContext } from '../../App.ctx';



const GAMES = gql`
  query GamesByPlayerId($id: String!){
    gamesByPlayerId(id: $id) {
      id
      title
    }
  }
`

const SelectGame = ({ path, playerId }: any) => {

  // Hooks
  const { playerContext } = React.useContext(PlayerContext)
  const { loading, error, data } = useQuery(GAMES, {
    variables: {
      id: playerContext.id
    }
  })

  if (loading) return <div>Loading games</div>
  if (error) return <div>Error </div>

  return (
    <div>
      {playerId} Games
      <ul className='game-list'>
        {data && data.gamesByPlayerId ? (
          data.gamesByPlayerId.map((game: any) => <li key={game.id}>{game.title}</li>)
        ) :
          null
        }
      </ul>
      <AddGame />
    </div>

  )
}

export default SelectGame;