import * as React from 'react';

// components
import { Link } from '@reach/router';

// assets
import partyPopper from './assets/party-popper_emoji.png';

// style
import './style.css';
import { useQuery } from '@apollo/client';
import { GET_GAME_ID_CLIENT } from '../../graphql/queries/client/getGameId';

const NotFound = ({ default: any }: any) => {

  const [isLoaded, setIsLoaded] = React.useState(false)
  const { data }: any = useQuery(GET_GAME_ID_CLIENT)

  console.log('gameId', data)
  return (
    <div className='notfound-container'>
      <p>This url doesn't match with any page but who know's ...</p>
      <p>maybe one day <img className='party-popper-emoji' src={partyPopper} alt='party popper icon' /></p>
      <Link to='/'>
        <button style={{ margin: '20px' }}>Return Home</button>
      </Link>
      <img style={isLoaded ? {} : { display: 'none' }} src='https://media.giphy.com/media/DfdbTJZx6Yjra/giphy.gif' alt='giphy_image' onLoad={() => setIsLoaded(true)} />
    </div >
  )
}

export default NotFound;