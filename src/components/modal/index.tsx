import * as React from 'react'

// packages
import AriaModal from 'react-aria-modal';
import UploadForm from './uploadForm';
import Screenshot from '../screenshot';

const Modal = ({ applicationProofUrl, jobId, missionId, openButton }: any) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  function openModal() {
    setIsModalOpen((prevState) => !prevState)
  }
  return (
    <>
      <button onClick={openModal}>{openButton}</button>
      {isModalOpen && (
        <AriaModal
          titleText='Application Proof'
          onExit={openModal}
          initialFocus='#go-back-button'
        >
          <div>
            <Screenshot
              openModal={openModal}
            />
            <UploadForm
              openModal={openModal}
              applicationProofUrl={applicationProofUrl}
              jobId={jobId}
              missionId={missionId}
            />
          </div>
        </AriaModal>
      )}
    </>
  )
}

export default Modal;