import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// components
import AddGameModal from './components/addGameModal';
import GameItem from './components/gameItem';

// query

// style
import './style.css';
import NavBar from '../../../navbar';
import { GET_GAMES_ClIENT } from '../../../../graphql/queries/client/getGamesClient';



const ListGames = ({ path }: any) => {

  const client = useApolloClient()
  const { games }: any = client.readQuery({
    query: GET_GAMES_ClIENT
  })

  const [gamesList, setGamesList] = React.useState(games)

  return (
    <div>
      <NavBar />
      <div className='game-list-container'>
        <div className='game-list-title'>
          <h3>Games</h3>
        </div>
        <ul className='game-list-ul'>
          {
            gamesList.map((game: any) => (
              <GameItem key={game.id} game={game} />
            ))
          }
        </ul>
        <div className='start-game-button'>
          <AddGameModal />
        </div>
      </div>
    </div>
  )
}

export default ListGames;