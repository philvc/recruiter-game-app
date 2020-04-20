import * as React from 'react';

// packages
import AriaModal from 'react-aria-modal';

// components
import AddGameForm from './components/addGameForm';

const AddGame = ({ }: any) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  function openModal() {
    setIsModalOpen((prevState) => !prevState)
  }

  console.log('isModalOpen :', isModalOpen)

  // if (data) {
  //   console.log('addgame data :', data.addGameMutation.title)
  //   // navigate(`/${data.addGameMutation.id}/:playerType/mission`)
  // }

  return (
    <div>
      <button onClick={openModal}>Start new recruiter game</button>
      {isModalOpen && (
        <AriaModal
          titleText='New Game'
          onExit={openModal}
          initialFocus='#title'
        >
          <div>
            <AddGameForm openModal={openModal} />
          </div>
        </AriaModal>
      )}

    </div>
  )
}

export default AddGame;