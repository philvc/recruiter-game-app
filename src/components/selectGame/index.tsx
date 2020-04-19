import * as React from 'react';

// packages
import { useQuery, useApolloClient } from '@apollo/react-hooks';

// components
import AddGame from './components/addGame';

// query
import { GET_PLAYERANDGAMES_CLIENT } from '../../graphql/queries/client/getPlayerAndGamesClient';

// style
import './style.css';



const SelectGame = ({ path, playerId, navigate }: any) => {
  const { loading, error, data } = useQuery(GET_PLAYERANDGAMES_CLIENT)
  console.log('query store :', data)
  // if (loading) return <div>Loading games</div>
  // if (error) return <div>Error </div>

  return (
    <div>
      Games
      {/* <ul className='game-list'>
        {data && data.games ? (
          data.games.map((game: any) => <li key={game.id}>{game.title}</li>)
        ) :
          null
        }
      </ul>
      <AddGame navigate={navigate} /> */}
    </div>

  )
}

export default SelectGame;