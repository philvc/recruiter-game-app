import * as React from 'react';

// packages
import { useQuery } from '@apollo/react-hooks';

// components
import AddGame from './components/addGame';

// style
import './style.css';

// queries
import { GET_GAMES } from '../../graphql/queries';

// context
import { PlayerContext } from '../../App.ctx';


const SelectGame = ({ path, playerId, navigate }: any) => {

  // Hooks
  const { playerContext } = React.useContext(PlayerContext)
  const { loading, error, data } = useQuery(GET_GAMES, {
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
        {data && data.games ? (
          data.games.map((game: any) => <li key={game.id}>{game.title}</li>)
        ) :
          null
        }
      </ul>
      <AddGame navigate={navigate} />
    </div>

  )
}

export default SelectGame;