import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// components
import AddGameModal from './components/addGameModal';
import GameItem from './components/gameItem';
import Contact from '../../../contact';
import NavBar from '../../../navbar';

// apollo
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../graphql/queries/client/getPlayerAndGamesClient';

// style
import './style.css';



const ListGames = ({ path }: any) => {

  // client
  const client = useApolloClient()
  const { games }: any = client.readQuery({
    query: GET_PLAYERANDGAMES_CLIENT
  })

  // state
  const [gamesList, setGamesList] = React.useState(games)

  return (
    <div>
      <NavBar />
      <div className='list-games-container'>
        <div className='list-games-title'>
          <h3>Games</h3>
          <div className='start-game-button'>
            <AddGameModal />
          </div>
        </div>
        <div className='list-games-body'>
          {
            gamesList.map((game: any) => (
              <GameItem key={game.id} game={game} />
            ))
          }
        </div>
      </div>
      <Contact />
    </div>
  )
}

export default ListGames;