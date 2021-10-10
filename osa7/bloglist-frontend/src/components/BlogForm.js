import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Input } from '../components/Styled'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <Input
            id='title'
            type='text'
            value={newTitle}
            name='Title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <Input
            id='author'
            type='text'
            value={newAuthor}
            name='Author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <Input
            id='url'
            type='text'
            value={newUrl}
            name='Url'
            onChange={handleUrlChange}
          />
        </div>
        <Button id='create-button' type='submit' primary=''>create</Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
