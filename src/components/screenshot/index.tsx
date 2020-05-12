import * as React from 'react';

import axios from 'axios';
import { useMutation, useApolloClient, gql } from '@apollo/client';



// components
import DropZone from '../dropzone';
import { CREATE_SIGNED_PUT_URL } from '../../graphql/mutations/server/createSignedPutUrl';
import { UPDATE_JOB_SERVER } from '../../graphql/mutations/server/updateJobServer';
import { GET_MISSION_CLIENT } from '../../graphql/queries/client/getMissionClient';
import { SEND_MESSAGE } from '../../graphql/mutations/server/sendMessage';
import { GET_GAME_CLIENT } from '../../graphql/queries/client/getGameClient';
import { UPDATE_MISSION_V2 } from '../../graphql/mutations/server/updateMissionV2';
import { GET_MISSIONS_CLIENT } from '../../graphql/queries/client/getMissionsClient';
import { ADD_JOB_APPLICATION_MISSION } from '../../graphql/mutations/server/addJobApplicationMission';

const Screenshot = ({ openModal }: any) => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { selectedJob } = mission
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })

  // state
  const [imageSource, setImageSource] = React.useState(selectedJob.applicationProofUrl)
  const [file, setFile] = React.useState({ type: '', name: '' })
  const [isLoaded, setIsLoaded] = React.useState(false)

  // mutations
  const [createSignedPutUrl, { loading, error, data }] = useMutation(CREATE_SIGNED_PUT_URL)
  const [updateJob] = useMutation(UPDATE_JOB_SERVER, {
    onCompleted({ updateJob }) {
      const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
      localStorage.setItem('mission', JSON.stringify(mission))
    }
  })
  const [sendMessage] = useMutation(SEND_MESSAGE)
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2, {
    onCompleted({ updateMissionV2 }) {
      localStorage.setItem('mission', JSON.stringify(updateMissionV2))
    }
  })
  const [addJobApplicationMission] = useMutation(ADD_JOB_APPLICATION_MISSION, {
    onCompleted({ addJobApplicationMission }) {
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })
      const newMissions = missions.concat(addJobApplicationMission)
      client.writeQuery({
        query: GET_MISSIONS_CLIENT,
        variables: { gameId: game.id },
        data: { missions: newMissions }
      })

      localStorage.setItem('missions', JSON.stringify(newMissions))
    }
  })

  // helpers

  // createSignedPutUrl
  function handleCreateSignedPutUrl(file: any) {
    setFile(file)
    createSignedPutUrl({
      variables: {
        fileName: file.name,
        mimeType: file.type,
        jobId: selectedJob.id
      }
    })

  }


  async function handleSaveDocument() {

    // axios headers
    const headers = {
      'Content-Type': file.type,
      'X-AMZ-SERVER-SIDE-ENCRYPTION': 'AES256',
      'Access-Control-Allow-Origin': '*',

    };

    // post document in aws S3
    await axios.put(data.createSignedPutUrl.signedPutUrl, file, { headers });

    // update job with SignedGetUrl
    updateJob({
      variables: {
        id: selectedJob.id,
        field: 'applicationProofUrl',
        data: data.createSignedPutUrl.signedGetUrl
      }
    })

    // send message 
    sendMessage({
      variables: {
        recipientId: game.recruiterId,
        subject: 'I have applied !!! Please check the screenshot',
        message: 'Dear recruiter, thank you for your job offer ! I just applied and uploaded my application proof, please review it ;)'
      }
    })

    updateMissionV2({
      variables: {
        id: mission.id,
        field: 'isReviewed',
        data: true,
      }
    })

    // close modal
    return openModal()
  }

  function handleValidateApplicationProof() {

    sendMessage({
      variables: {
        recipientId: game.applicantId,
        subject: 'One big success !!',
        message: 'Congrats !! Your recruiter validated your challenge !'
      }
    })

    updateMissionV2({
      variables: {
        id: mission.id,
        field: 'status',
        data: 'completed',
      }
    })

    addJobApplicationMission({
      variables: {
        quantity: 3,
        gameId: game.id
      }
    })

    return openModal()
  };



  return (
    <div>
      <img style={isLoaded ? {} : { display: 'none' }} src={imageSource} alt='no uploaded document' onLoad={() => setIsLoaded(true)} />
      {!isLoaded && selectedJob.applicationProofUrl && <p>Loading Image ...</p>}
      <DropZone
        handleCreateSignedPutUrl={handleCreateSignedPutUrl}
      />
      {file.name && (
        <p>{file.name}</p>
      )}
      <button id='go-back-button' onClick={openModal} disabled={loading}>Go Back</button>
      {mission.status === 'pending' && (
        <button onClick={handleSaveDocument} disabled={loading}>Save application proof</button>
      )}
      {mission.isReviewed === true && <button onClick={handleValidateApplicationProof}>Validate application proof</button>}
    </div>
  )
}
export default Screenshot;