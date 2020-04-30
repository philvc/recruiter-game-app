import * as React from 'react';

// modules
import { useDrag, useDrop } from 'react-dnd';
import ApplicationProofModal from './components/application-proof-modal';

// reducer
import { reducer, actions } from './reducer';
import { useMutation } from '@apollo/client';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../../../graphql/mutations/server/updateJobServer';


const JobRow = ({ job, index, id, moveJob, missionId }: any) => {

  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const [state, dispatch] = React.useReducer(reducer, job)
  const [updateJobServer] = useMutation(UPDATE_JOB_SERVER)

  React.useEffect(() => {
    async function updateJobRank() {
      updateJobServer({
        variables: {
          id,
          field: 'rank',
          data: index + 1
        }
      })
    }
    updateJobRank()

  }, [index, id, updateJobServer])

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

  function handleChange(e: any) {
    console.log('handleChange fct')
    dispatch({ type: e.target.name, payload: e.target.value })
    updateJobServer({
      variables: {
        id: state.id,
        field: e.target.name,
        data: e.target.value
      }
    })
  }

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity, margin: "30px" }}>
      <span>{index + 1}</span>
      <span>{state.id}</span>
      <input name='url' value={state.url} onChange={handleChange} />
      <ApplicationProofModal
        applicationProofUrl={state.applicationProofUrl}
        jobId={state.id}
        missionId={state.missionId}
        dispatch={dispatch}
      />
      {/* <input name='name' value={job.name} onChange={(e) => handleChange(e, index, job)} /> */}
    </div>
  )
}

export default JobRow;