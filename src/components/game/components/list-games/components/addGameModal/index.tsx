import * as React from 'react';

// packages
import AriaModal from 'react-aria-modal';

// components
import AddGameForm from './components/addGameForm';

// style
import './style.css'

const AddGameModal = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  function openModal() {
    setIsModalOpen((prevState) => !prevState)
  }

  return (
    <div>
      <button onClick={openModal}>Start a new game</button>
      {isModalOpen && (
        <AriaModal
          titleText='New Game'
          onExit={openModal}
          initialFocus='#title'
          includeDefaultStyles={false}
          underlayColor='rgba(0,0,0,0.8)'
          underlayStyle={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
        >
          <div className='add-game-modal-container'>
            <AddGameForm openModal={openModal} />
          </div>
        </AriaModal>
      )
      }

    </div >
  )
}

export default AddGameModal;