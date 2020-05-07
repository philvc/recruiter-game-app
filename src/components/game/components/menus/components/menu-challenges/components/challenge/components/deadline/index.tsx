import * as React from 'react';

const Deadline = ({ handleChange }: any) => {
  return (
    <div>
      <p>Step 2: Choose a deadline, deadline are fun !</p>
      <div>
        <label>
          <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 1)} onClick={handleChange} />24H
              </label>
        <label>
          <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 2)} onClick={handleChange} />48H
              </label>
        <label>
          <input type='radio' name='date' value={new Date().setDate(new Date().getDate() + 3)} onClick={handleChange} />72H
              </label>
      </div>
    </div>
  )
};

export default Deadline;