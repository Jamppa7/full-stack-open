import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Input } from '../components/Styled'
import { addComment, removeBlog, updateBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

  const comment = (event) => {
    event.preventDefault()

    blog.comments.push(newComment)
    dispatch(addComment(blog.id, blog))

    setNewComment('')
  }

  const remove = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      dispatch(removeBlog(blog))
    }
  }

  const update = (event) => {
    event.preventDefault()

    blog.likes++
    dispatch(updateBlog(blog.id, blog))
  }

  return (
    <div id='blogDiv'>
      <h2>{blog.title} {blog.author}</h2>
      <b><a href={blog.url}>{blog.url}</a></b><br /><br />
      {blog.likes} likes <Button onClick={update}>like</Button><br />
      Added by {blog.user.name}<br />
      {user.username === blog.user.username
        ? <Button onClick={remove}>remove blog</Button>
        : <></>
      }
      <h3>Comments</h3>
      <Input type='text' value={newComment} onChange={handleCommentChange} />
      <Button onClick={comment}>add comment</Button>
      <ul>
        {blog.comments.map(comment => (
          <li key={Math.random().toString(36).substr(2, 9)}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
