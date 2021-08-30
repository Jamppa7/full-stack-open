import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, update, remove }) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} id='blogDiv'>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'view'}
        </button>
      </div>
      {showAll === true ?
        <div>
          {blog.url}<br></br>
          likes {blog.likes} <button onClick={update}>like</button><br></br>
          {blog.user.name}<br></br>
          {user.username === blog.user.username ?
            <button onClick={remove}>remove</button>
            : <></>}
        </div>
        : <></>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default Blog
