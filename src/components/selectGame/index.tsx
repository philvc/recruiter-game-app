import * as React from 'react';

// packages
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// components
import AddGame from './components/addGame';

// query
import { GET_GAMES_ClIENT } from '../../graphql/queries/getGamesClient';

// style
import './style.css';

const GET_PLAYER_CLIENT = gql`
  query Player {
    player @client{
      id
      firstName
      lastName
      email
    }
  }
`


const SelectGame = ({ path, playerId, navigate }: any) => {
  const { loading, error, data } = useQuery(GET_PLAYER_CLIENT)

  if (loading) return <div>Loading games</div>
  if (error) return <div>Error </div>

  console.log('player data :', data)
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