import React from 'react'
import { useSelector } from 'react-redux'

const Error = () => {
  const error = useSelector(state => state.error)

  if (error !== '') {
    return (
      <div className='error'>
        {error}
      </div>
    )
  } else {
    return ''
  }
}

export default Error
