import * as React from 'react';

// modules
import { useDrag, useDrop } from 'react-dnd';
import Screenshot from './components/screenshot';


const JobRow = ({ job, index, handleChange, id, moveJob }: any) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>

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
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveJob(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
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
      <span>{index + 1}</span>
      <span>{job.id}</span>
      <input name='url' value={job.url} onChange={(e) => handleChange(e, index, job)} />
      {/* <input name='name' value={job.name} onChange={(e) => handleChange(e, index, job)} /> */}
      <Screenshot />
    </div>
  )
}

export default JobRow;