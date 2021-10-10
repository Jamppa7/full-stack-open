import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
  const message = useSelector(state => state.message)

  if (message !== '') {
    return (
      <div className='message'>
        {message}
      </div>
    )
  } else {
    return ''
  }
}

export default Message
