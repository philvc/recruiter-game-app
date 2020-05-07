import * as React from 'react';

const Message = ({ handleChange, message }: any) => {
  return (
    <div>
      <p>Step 3: Send your message</p>
      <input type='texteArea' name='message' value={message} onChange={handleChange} />
    </div>
  )
};

export default Message;