import * as React from 'react';

// packages
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from '@reach/router';

const PLAYERS = gql`
    query Players{
      players{
        id
        firstName
        lastName
      }
    }
  `

const SelectPlayer = ({ path }: any) => {
  const { loading, error, data } = useQuery(PLAYERS)

  function handleClick() {
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: </p>

  return (
    <div>
      Select Player
      {data && data.players && data.players.map((player: any, index: number) =>
        (
          <div key={player.id} onClick={handleClick}>
            <Link to={`/${player.id}`}>{player.firstName}</Link>
          </div>
        )
      )}
    </div>
  )
}

export default SelectPlayer;