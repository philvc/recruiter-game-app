import * as React from 'react';

// modules
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/react-hooks';

// graphql
import { CREATE_SIGNED_URL } from '../../../../../../../../../../../../graphql/mutations/server/createSignedUrl';


const Screenshot = () => {
  const [file, setFile] = React.useState('')
  const [createSignedUrl] = useMutation(CREATE_SIGNED_URL)
  const onDrop = React.useCallback(async acceptedFiles => {
    console.log('ondrop fct', acceptedFiles[0])
    // Do something with the files
    const { name, type } = acceptedFiles[0]
    console.log('input', name, type)
    setFile(name)
    // create signed url
    const result = await createSignedUrl({
      variables: {
        fileName: name,
        mimeType: type
      }
    })

    console.log('result create signedUrl', result)
    // axios.put(signedUrl, file)

    // getmethod
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <div>{file}</div>
    </div>
  )
}

export default Screenshot;

