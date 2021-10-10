import React from 'react'
import PropTypes from 'prop-types'

const User = ({ user, blogs }) => {
  return (
    <div>
      <h2>{user.user.name}</h2>
      <h3>Added blogs</h3>
      {blogs.map(blog => (
        <ul key={blog.id}>
          <li>{blog.title}</li>
        </ul>
      ))}
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired
}

export default User
