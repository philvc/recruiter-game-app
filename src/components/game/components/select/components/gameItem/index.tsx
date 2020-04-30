import * as React from 'react';
import { Link } from '@reach/router';
import { useApolloClient, gql } from '@apollo/client';

const GameItem = ({ id, title }: any) => {
  const client = useApolloClient();

  return (
    <Link to={`/games/${id}/mission/list`}>
      <div className='game-link' onClick={() => client.writeQuery(
        {
          query: gql`{gameId}`,
          data: { gameId: id }
        })}>
        {title}
      </div>
    </Link>
  )
}

export default GameItem;