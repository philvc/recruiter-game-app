import * as React from 'react';

const Message = ({ setMessage, message }: any) => {

  function handleChange(e: any) {
    setMessage(e.target.value)
  }
  return (
    <div>
      <label> Send your message:
        <input type='texteArea' name='message' value={message} onChange={handleChange} />
      </label>
    </div>
  )
};

export default Message;