import * as React from 'react';

// modules
import { useDrag, useDrop } from 'react-dnd';

// reducer
import { reducer } from './reducer';
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_JOB_SERVER } from '../../../../../../../../../../../../../../graphql/mutations/server/updateJobServer';
import { UPDATE_MISSION_SERVER } from '../../../../../../../../../../../../../../graphql/mutations/server/updateMissionServer';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';


const JobRow = ({ job, index, id, moveJob, missionId }: any) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const client = useApolloClient()
  const { game, player }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })
  const [state, dispatch] = React.useReducer(reducer, job)
  const [updateMission] = useMutation(UPDATE_MISSION_SERVER, { variables: { id: missionId } })
  const [updateJobServer] = useMutation(UPDATE_JOB_SERVER, {
    onCompleted() {

      updateMission()

    }
  })

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

  React.useEffect(() => {
    async function updateJobIsComplete() {
      updateJobServer({
        variables: {
          id,
          field: 'isComplete',
          data: state.isComplete
        }
      })

    }
    updateJobIsComplete()

  }, [state.isComplete, updateJobServer, id])
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
    if (e.target.name !== 'isAccepted') {
      dispatch({ type: e.target.name, payload: e.target.value })
      updateJobServer({
        variables: {
          id: state.id,
          field: e.target.name,
          data: e.target.value
        }
      })
    } else {
      dispatch({ type: e.target.name, payload: e.target.checked })
      updateJobServer({
        variables: {
          id: state.id,
          field: e.target.name,
          data: e.target.checked
        }
      })
    }
  }

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity, margin: "30px" }}>
      <span>{index + 1}</span>
      <span>{state.id}</span>
      <input name='url' value={state.url} onChange={handleChange} />
      {player.id === game.applicantId &&
        (<label>
          <input type='checkbox' name="isAccepted" onChange={handleChange} checked={state.isAccepted} />
        </label>)
      }
    </div>
  )
}

export default JobRow;