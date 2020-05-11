import * as React from 'react';

const Deadline = ({ setSelectedDate }: any) => {

  function handleClick(e: any) {
    setSelectedDate(e.target.value)
  };

  return (
    <div>
      <p>Step 2: Choose a deadline, deadline are fun !</p>
      <div>
        <label>
          <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 1)} onClick={handleClick} />24H
              </label>
        <label>
          <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 2)} onClick={handleClick} />48H
              </label>
        <label>
          <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 3)} onClick={handleClick} />72H
              </label>
      </div>
    </div>
  )
};

export default Deadline;