import * as React from 'react';

// modules
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

// components
import List from './components/list-jobs';

const Mission10JobOffers = () => {

  // const [updateGame] = useMutation(UPDATE_GAME, {
  //   variables: { id: gameId },
  //   onCompleted({ updateGame }) {
  //     const { missionsAccomplished } = updateGame;

  //     if (missionsAccomplished === 1 && game.missionsAccomplished === 0) {
  //       createNewMission({ variables: { gameId, type: 'jobapplication' } })
  //     }
  //     localStorage.setItem('game', JSON.stringify(updateGame))
  //   }
  // })



  return (
    <div>
      <h1>10 Job Offers Mission</h1>
      <DndProvider backend={Backend}>
        <List />
      </DndProvider>
    </div>
  )
}

export default Mission10JobOffers;