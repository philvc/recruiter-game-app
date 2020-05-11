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
        >
          <WrappedComponent openModal={openModal} />
        </AriaModal>
      )}
    </>
  )
}

export default Modal;