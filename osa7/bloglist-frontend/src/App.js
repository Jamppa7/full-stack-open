import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './components/Home'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import User from './components/User'
import Users from './components/Users'
import Message from './components/Message'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { Page, Navigation, Footer } from './components/Styled'
import { initUser, loginUser, logoutUser } from './reducers/loginReducer'
import { initUsers } from './reducers/userReducer'
import { initBlogs, createBlog } from './reducers/blogReducer'
import { Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [])

  useEffect(() => {
    dispatch(initUsers())
  }, [])

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const handleLogin = (user) => {
    dispatch(loginUser(user))
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility()

    dispatch(createBlog(blog))
  }

  const loginForm = () => (
    <LoginForm credentials={handleLogin} />
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const padding = {
    padding: 5
  }

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const blogs = useSelector(state => state.blogs)
  const blogsSorted = [...blogs.sort((first, second) => second.likes - first.likes)]

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogMatch = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const matchUser = useRouteMatch('/users/:id')
  const userMatch = matchUser
    ? blogs.find(blog => blog.user.id === matchUser.params.id)
    : null

  let userBlogs = null
  if (userMatch) {
    userBlogs = [...blogs.filter(blog => blog.user.username === userMatch.user.username)]
  }

  return (
    <Page>
      <Navigation>
        <Link style={padding} to='/'>Home</Link>
        <Link style={padding} to='/blogs'>Blogs</Link>
        <Link style={padding} to='/users'>Users</Link>
        {user
          ? <em>{user.name} logged in <button onClick={handleLogout}>logout</button></em>
          : <Link style={padding} to='/login'>Login</Link>
        }
      </Navigation>
      <Message />
      <Error />
      <Switch>
        <Route path='/blogs/:id'>
          {user && blogMatch
            ? <Blog blog={blogMatch} user={user} />
            : <></>
          }
        </Route>
        <Route path='/users/:id'>
          {user && userBlogs
            ? <User user={userMatch} blogs={userBlogs} />
            : <></>
          }
        </Route>
        <Route path='/blogs'>
          {user
            ? <div><h2>Blogs</h2> {blogForm()} <Blogs blogs={blogsSorted} /></div>
            : loginForm()
          }
        </Route>
        <Route path='/users'>
          {user
            ? <div><h2>Users</h2> <Users users={users} blogs={blogs} /></div>
            : loginForm()
          }
        </Route>
        <Route path='/login'>
          {user
            ? <Redirect to='/' />
            : loginForm()
          }
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
      <Footer>
        <em>Blogs app, Department of Computer Science 2021</em>
      </Footer>
    </Page>
  )
}

export default App
