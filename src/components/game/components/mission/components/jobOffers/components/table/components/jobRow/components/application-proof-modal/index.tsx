import * as React from 'react'

// packages
import AriaModal from 'react-aria-modal';
import UploadForm from './uploadForm';

const ApplicationProofModal = ({ applicationProofUrl }: any) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  function openModal() {
    setIsModalOpen((prevState) => !prevState)
  }
  return (
    <>
      <button onClick={openModal}>{applicationProofUrl ? 'View' : 'Upload'}</button>
      {isModalOpen && (
        <AriaModal
          titleText='Application Proof'
          onExit={openModal}
          initialFocus='#go-back-button'
        >
          <div>
            <UploadForm openModal={openModal} applicationProofUrl={applicationProofUrl} />
          </div>
        </AriaModal>
      )}
    </>
  )
}

export default ApplicationProofModal;