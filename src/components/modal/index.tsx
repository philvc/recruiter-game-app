import * as React from 'react'

// packages
import AriaModal from 'react-aria-modal';

const Modal = ({ title, button, WrappedComponent }: any) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  function openModal() {
    setIsModalOpen((prevState) => !prevState)
  }
  return (
    <>
      <button onClick={openModal}>{button}</button>
      {isModalOpen && (
        <AriaModal
          titleText={title}
          onExit={openModal}
          initialFocus='#go-back-button'
          includeDefaultStyles={false}
          underlayColor='rgba(0,0,0,0.8)'
          underlayStyle={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.9)',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <WrappedComponent openModal={openModal} />
        </AriaModal>
      )}
    </>
  )
}

export default Modal;