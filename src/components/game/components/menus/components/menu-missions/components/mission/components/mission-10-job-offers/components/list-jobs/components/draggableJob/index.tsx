import * as React from 'react';

// modules
import { useDrag, useDrop } from 'react-dnd';

// apollo
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../../../../../graphql/mutations/server/updateJobServer';

// reducer
import { reducer } from './reducer';
import JobItem from './components/job-item';



const DraggableJob = ({ id, index, moveJob, job }: any) => {

  // client
  // const client = useApolloClient()
  // const { game, player }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })

  // state & ref
  // const [state, dispatch] = React.useReducer(reducer, job)
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>

  //mutation
  // const [updateMission] = useMutation(UPDATE_MISSION_SERVER, {
  //   variables: { id: missionId },
  //   onCompleted({ updateMission }) {
  //     console.log('updateMission', updateMission)
  //     localStorage.setItem('mission', JSON.stringify(updateMission))
  //   }
  // })

  const [updateJobServer] = useMutation(UPDATE_JOB_SERVER, {
    onCompleted() {
      // updateMission()
    }
  })

  // effects
  React.useEffect(() => {
    async function updateJobRank() {
      updateJobServer({
        variables: {
          id: job.id,
          field: 'rank',
          data: index + 1
        }
      })
    }
    updateJobRank()

  }, [index, id, updateJobServer, job])

  // React.useEffect(() => {
  //   async function updateJobIsComplete() {
  //     updateJobServer({
  //       variables: {
  //         id: job.id,
  //         field: 'isComplete',
  //         data: state.isComplete
  //       }
  //     })

  //   }
  //   updateJobIsComplete()

  // }, [state.isComplete, updateJobServer, job])

  // helpers
  const [, drop] = useDrop({
    accept: 'JOB',
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveJob(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  });


  const [{ isDragging }, drag] = useDrag({
    item: { type: 'JOB', id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity, margin: "30px" }}>
      <JobItem index={index} job={job} />
    </div>
  )
}

export default DraggableJob;