import * as React from 'react';

const Message = ({ setMessage, message }: any) => {

  function handleChange(e: any) {
    setMessage(e.target.value)
  }
  return (
    <div>
      <p>Step 3: Send your message</p>
      <input type='texteArea' name='message' value={message} onChange={handleChange} />
    </div>
  )
};

export default Message;