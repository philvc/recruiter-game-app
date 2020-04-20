import * as React from 'react';

// packages
import { useQuery } from '@apollo/react-hooks';

// components
import AddGame from './components/addGameModal';

// query
import { GET_PLAYERANDGAMES_CLIENT } from '../../graphql/queries/client/getPlayerAndGamesClient';

// style
import './style.css';



const SelectGame = ({ path }: any) => {
  const { loading, error, data } = useQuery(GET_PLAYERANDGAMES_CLIENT)
  console.log('query store :', data)

  if (loading) return null
  if (error) return null

  return (
    <div>
      Games
      <ul className='game-list'>
        {data && data.games ? (
          data.games.map((game: any) => <li key={game.id}>{game.title}</li>)
        ) :
          null
        }
      </ul>
      <AddGame />
    </div>

  )
}

export default SelectGame;