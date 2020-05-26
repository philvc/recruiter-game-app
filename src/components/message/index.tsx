import * as React from 'react';

// styles
import './styles.css'

const Message = ({ setMessage, message, context }: any) => {

  function handleChange(e: any) {
    setMessage(e.target.value)
  }
  return (
    <div className='message-container'>
      <label>
        <textarea name='message' value={message} onChange={handleChange} />
      </label>
    </div>
  )
};

export default Message;