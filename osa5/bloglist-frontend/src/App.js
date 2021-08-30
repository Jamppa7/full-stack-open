import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogs.sort((first, second) => second.likes - first.likes))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const blog = await blogService.create(blogObject)
      const allBlogs = await blogService.getAll()

      setBlogs(allBlogs.sort((first, second) => second.likes - first.likes))

      setMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setError(exception.response.data.error)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const updateLikes = async (blog) => {
    const likes = blog.likes

    try {
      blog.likes++

      const updateBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user.id
      }

      await blogService.update(blog.id, updateBlog)

      const allBlogs = await blogService.getAll()

      setBlogs(allBlogs.sort((first, second) => second.likes - first.likes))

    } catch (exception) {
      blog.likes = likes
      setError(exception.response.data.error)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
        await blogService.remove(blog.id)

        setBlogs(blogs.filter(b => b.id !== blog.id))

        setMessage(`deleted blog ${blog.title} by ${blog.author}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
    } catch (exception) {
      setError(exception.response.data.error)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <Message message={message} />
        <Error error={error} />
        {loginForm()}
      </div>
    )
  } else if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Message message={message} />
        <Error error={error} />
        <p>{user.name} logged in
          <button onClick={handleLogout}>logout</button></p>
        {blogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user}
            update={() => updateLikes(blog)} remove={() => deleteBlog(blog)} />
        )}
      </div>
    )
  }
}

export default App
