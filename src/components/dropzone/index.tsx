import * as React from 'react';

// modules
import { useDropzone } from 'react-dropzone';

// graphql

// style
import './style.css'


const DropZone = ({ handleCreateSignedPutUrl }: any) => {

  const onDrop = React.useCallback(acceptedFiles => {
    // Do something with the files
    handleCreateSignedPutUrl(acceptedFiles[0])

  }, [handleCreateSignedPutUrl])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className='dropzone-container'>
      <div className='dropzone-container-body'{...getRootProps()}>
        <input className='dropzone-container-body-input'{...getInputProps()} />
        {
          isDragActive ?
            <p className='dropzone-container-body-p'>Drop the files here ...</p> :
            <p className='dropzone-container-body-p'>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
    </div>
  )
}

export default DropZone;

