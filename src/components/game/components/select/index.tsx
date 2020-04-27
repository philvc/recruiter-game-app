import * as React from 'react';

// modules
import { useQuery } from '@apollo/client';
import { Link } from '@reach/router';

// components
import AddGame from './components/addGameModal';

// query
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../graphql/queries/client/getPlayerAndGamesClient';

// style
import './style.css';



const SelectGame = ({ path }: any) => {

  const { loading, error, data } = useQuery(GET_PLAYERANDGAMES_CLIENT)
  if (loading) return null
  if (error) return null

  return (
    <div>
      Games
      <ul className='game-list'>
        {data && data.games ? (
          data.games.map((game: any) => <Link key={game.id} to={`/${data.firstName}/${game.id}/mission`}>{game.title}</Link>)
        ) :
          null
        }
      </ul>
      <AddGame />
    </div>

  )
}

export default SelectGame;