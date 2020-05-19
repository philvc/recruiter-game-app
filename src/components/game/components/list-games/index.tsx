import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// components
import AddGameModal from './components/addGameModal';
import GameItem from './components/gameItem';
import Contact from '../../../contact';

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
      <div className='list-games-container'>
        <div className='list-games-title'>
          <h3>Games</h3>
          {gamesList.length === 0 && (
            <div className='games-description-container'>
              <p>Welcome to 10 Jobs Challenge!</p>
              <p>If you have a friend who is struggeling to apply for new jobs, this game migth be a nice solution.</p>
              <p> You and your friend  will accomplish different kind of missions that will lead your friend closer to his or her new job!</p>
              {/* <p>How does it work ? Right now the game includes 1 mission for the recruiter and 1 challenge for the job seeker.</p> */}
              <p>To start a new game, you just need to invite your job-seeking friend by clicking on the button below.</p>
              <p>Good luck !</p>
            </div>
          )
          }
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