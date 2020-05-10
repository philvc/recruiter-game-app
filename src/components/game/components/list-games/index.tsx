import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// components
import AddGameModal from './components/addGameModal';
import GameItem from './components/gameItem';
import chatIcon from './assets/chat_icon.svg'

// query

// style
import './style.css';
import NavBar from '../../../navbar';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../graphql/queries/client/getPlayerAndGamesClient';

import Chat from '@nightborn/signum';

import '@nightborn/signum/dist/index.css';

const defaultProps = {
  option: {
    title: 'Hello !',
    subTitle: 'Share your thoughts ;-)',
    message: 'How can I help you?',
    name: 'Hello there',
    options: []
  },
  config: {
    openByDefault: false,
    avatarIcon: chatIcon,
    mainColor: 'linear-gradient(90deg, #406321 0%, #283E15 100%)',
    secondaryColor: 'linear-gradient(90deg, #406321 0%, #283E15 100%)',
    sendButtonColor: '#0074CE',
    finalButtonColor: "linear-gradient(90deg, #406321 0%, #283E15 100%)",
    emailPlaceholder: 'Please fill in your e-mail',
    messagePlaceholder: 'Please provide us some information',
    finalTitle: 'Thank you.',
    finalSubTitle: "We'll be in touch!",
    finalButtonText: "Continue",
    handleFinalButtonClicked: () => { },
    handleSendClicked: (information: any) => console.log(information),
  }
}

const ListGames = ({ path }: any) => {

  const client = useApolloClient()
  const { games }: any = client.readQuery({
    query: GET_PLAYERANDGAMES_CLIENT
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
        <Chat {...defaultProps} />
      </div>
    </div>
  )
}

export default ListGames;