import * as React from 'react';

// modules
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
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

    const { data } = await createSignedUrl({
      variables: {
        fileName: name,
        mimeType: type
      }
    })
    // axios.put(signedUrl, file)
    const headers = {
      'Content-Type': acceptedFiles[0].type,
      'X-AMZ-SERVER-SIDE-ENCRYPTION': 'AES256',
      'Access-Control-Allow-Origin': '*',

    };

    await axios.put(data.createSignedUrl, acceptedFiles[0], { headers });

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

