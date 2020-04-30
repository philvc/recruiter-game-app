import * as React from 'react';

// modules
import { useQuery } from '@apollo/client';

// components
import AddGameModal from './components/addGameModal';
import GameItem from './components/gameItem';

// query
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../graphql/queries/client/getPlayerAndGamesClient';

// style
import './style.css';



const SelectGame = ({ path }: any) => {

  const { loading, error, data } = useQuery(GET_PLAYERANDGAMES_CLIENT)
  if (loading) return null
  if (error) return null

  return (
    <div className='game-list-container'>
      <div className='game-list-title'>
        Games
      </div>
      <ul className='game-list-ul'>
        {data && data.games ? (
          data.games.map((game: any) => (
            <GameItem key={game.id} id={game.id} title={game.title} />
          ))
        ) :
          null
        }
      </ul>
      <div className='start-game-button'>
        <AddGameModal />
      </div>
    </div>

  )
}

export default SelectGame;