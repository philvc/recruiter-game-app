import * as React from 'react';

// modules
import { useApolloClient, useSubscription } from '@apollo/client';

// components
import AddGameModal from './components/addGameModal';
import GameItem from './components/gameItem';
import Contact from '../../../contact';

// style
import './style.css';

// apollo
import { GET_PLAYER_CLIENT } from '../../../../graphql/queries/client/getPlayerClient';
import { NEW_GAME_SUBSCRIPTION } from '../../../../graphql/subscriptions/newGame';
import { GET_GAMES_CLIENT } from '../../../../graphql/queries/client/getGamesClient';



const ListGames = ({ path }: any) => {

  // client
  const client = useApolloClient()
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })
  const { games }: any = client.readQuery({
    query: GET_GAMES_CLIENT,
    variables: {
      playerId: player.id
    }
  })

  // state
  const [gamesList, setGamesList] = React.useState(games)

  // subscription

  const { loading: subLoading, error: subError, data: subData } = useSubscription(NEW_GAME_SUBSCRIPTION, { variables: { playerId: player.id } })


  // effects
  React.useEffect(() => {
    if (subData) {

      const { games }: any = client.readQuery({ query: GET_GAMES_CLIENT, variables: { playerId: player.id } })
      const newGames = games.concat([subData.newGame])

      // update client 
      client.writeQuery({
        query: GET_GAMES_CLIENT,
        variables: {
          playerId: player.id,
        },
        data: {
          games: newGames
        }
      })

      // update state
      setGamesList(newGames)

      // update storage
      localStorage.setItem('games', JSON.stringify(newGames))
    }
  }, [subData, client, player.id])

  return (
    <div>
      <div className='list-games-container'>
        <div className='list-games-title'>
          <h3>Challenges</h3>
          {gamesList.length === 0 && (
            <div className='games-description-container'>
              <p>Nice your account has been created!</p>
              <p>Let's start a new '10 jobs challenge' where you will invite your friend to apply to jobs selected for him.</p>
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