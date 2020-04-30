import * as React from 'react';

// modules
import { useQuery } from '@apollo/client';
import { Link } from '@reach/router';

// components
import AddGameModal from './components/addGameModal';

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
            <div className='game-link' key={game.id}>
              <Link
                to={`/${data.firstName}/${game.id}/mission`}>
                {game.title}
              </Link>
            </div>
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