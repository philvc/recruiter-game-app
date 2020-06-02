import * as React from 'react';

// modules
import axios from 'axios';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { navigate } from '@reach/router';

// components
import DropZone from '../dropzone';

// styles
import './styles.css';

// apollo
import { CREATE_SIGNED_PUT_URL } from '../../graphql/mutations/server/createSignedPutUrl';
import { UPDATE_JOB_SERVER } from '../../graphql/mutations/server/updateJobServer';
import { GET_MISSION_CLIENT } from '../../graphql/queries/client/getMissionClient';
import { SEND_MESSAGE } from '../../graphql/mutations/server/sendMessage';
import { GET_GAME_CLIENT } from '../../graphql/queries/client/getGameClient';
import { UPDATE_MISSION_V2 } from '../../graphql/mutations/server/updateMissionV2';
import { GET_MISSIONS_CLIENT } from '../../graphql/queries/client/getMissionsClient';
import { GET_PLAYERANDGAMES_CLIENT } from '../../graphql/queries/client/getPlayerAndGamesClient';
import { CREATE_MISSION } from '../../graphql/mutations/server/createMissionServer';


const Screenshot = ({ openModal }: any) => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { selectedJob } = mission
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { player }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })

  // state
  const [imageSource, setImageSource] = React.useState(selectedJob.applicationProofUrl)
  const [file, setFile] = React.useState({ type: '', name: '' })
  const [isLoaded, setIsLoaded] = React.useState(false)

  // mutations
  const [createSignedPutUrl, { loading, error, data }] = useMutation(CREATE_SIGNED_PUT_URL)
  const [updateJob] = useMutation(UPDATE_JOB_SERVER)
  const [sendMessage] = useMutation(SEND_MESSAGE)
  const [updateMissionV2] = useMutation(UPDATE_MISSION_V2, {
    onCompleted({ updateMissionV2 }) {

      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })

      localStorage.setItem('missions', JSON.stringify(missions))
      localStorage.setItem('mission', JSON.stringify(updateMissionV2))
      openModal()
      navigate(`/games/${game.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('')}/challenges`)
    }
  })
  const [createMission] = useMutation(CREATE_MISSION, {
    onCompleted({ createMission }) {
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId: game.id } })
      const newMissions = missions.concat(createMission)
      client.writeQuery({
        query: GET_MISSIONS_CLIENT,
        variables: { gameId: game.id },
        data: { missions: newMissions }
      })

      localStorage.setItem('missions', JSON.stringify(newMissions))
      openModal()
      navigate(`/games/${game.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('')}/challenges`)
    }
  })

  // handlers
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

    await updateJob({
      variables: {
        id: selectedJob.id,
        field: 'applicationProofUrl',
        data: data.createSignedPutUrl.signedGetUrl
      }
    }).then(data => {
      const { updateJob } = data.data
    })

    await updateMissionV2({
      variables: {
        id: mission.id,
        field: 'isUnderReview',
        data: true,
      }
    })

    // send message 
    await sendMessage({
      variables: {
        recipientId: game.recruiterId,
        subject: 'I have applied !!! Please check the screenshot',
        message: 'Dear recruiter, thank you for your job offer ! I just applied and uploaded my application proof, please review it ;)'
      }
    })

  }

  async function handleAcceptOrDeclineDocument(e: any) {

    const isValid = e.target.value === 'validate' ? true : false;

    sendMessage({
      variables: {
        recipientId: game.applicantId,
        subject: isValid ? 'One big success !!' : ' :-(( Declined application proof',
        message: isValid ? 'Congrats !! Your recruiter validated your challenge !' : 'Your application proof is not accepted, try again !',
      }
    })


    if (isValid) {


      await updateJob({
        variables: {
          id: selectedJob.id,
          field: 'isApplied',
          data: true,
        }
      })


      await createMission({
        variables: {
          quantity: 3,
          gameId: game.id,
          type: 'jobapplication',
        }
      })
    }

    if (!isValid) {

      await updateJob({
        variables: {
          id: selectedJob.id,
          field: 'isSelected',
          data: false,
        }
      })

      await updateJob({
        variables: {
          id: selectedJob.id,
          field: 'applicationProofRef',
          data: '',
        }
      })

    }


    await updateMissionV2({
      variables: {
        id: mission.id,
        field: 'status',
        data: 'completed',
      }
    })

  };



  return (
    <div className='screenshot-container'>
      <img className='screenshot-img' style={isLoaded ? {} : { display: 'none' }} src={imageSource} alt='no uploaded document' onLoad={() => setIsLoaded(true)} />
      {!isLoaded && selectedJob.applicationProofUrl && <p>Loading Image ...</p>}
      <DropZone
        handleCreateSignedPutUrl={handleCreateSignedPutUrl}
      />
      {file.name && (
        <p style={{ color: 'white' }}>{file.name}</p>
      )}
      {mission.status === 'pending' &&
        player.id === game.applicantId &&
        data?.createSignedPutUrl.signedGetUrl &&
        (<button onClick={handleSaveDocument} disabled={loading}>Save</button>)
      }
      {mission.isUnderReview === true && player.id === game.recruiterId &&
        (
          <div className='screenshot-button-valide-decline'>
            <button onClick={handleAcceptOrDeclineDocument} value='validate'>Validate</button>
            <button onClick={handleAcceptOrDeclineDocument} value='decline'>Decline</button>
          </div>
        )
      }
      <button className='screenshot-container-button-back' id='go-back-button' onClick={openModal} disabled={loading}>Go Back</button>
    </div>
  )
}
export default Screenshot;