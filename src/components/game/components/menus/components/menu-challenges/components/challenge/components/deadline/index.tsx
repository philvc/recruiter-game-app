import * as React from 'react';

// styles
import './styles.css'

const Deadline = ({ setSelectedDate }: any) => {

  // handlers
  function handleClick(e: any) {
    setSelectedDate(e.target.value)
  };

  return (
    <div className='deadline-container'>
      <p>Step 2:</p>
      <div>Choose a deadline</div>
      <p>
        <label className='deadline-container-radio'>
          <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 1)} onClick={handleClick} />24H
              </label>
        <label>
          <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 2)} onClick={handleClick} />48H
              </label>
        <label>
          <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 3)} onClick={handleClick} />72H
              </label>
      </p>
    </div>
  )
};

export default Deadline;