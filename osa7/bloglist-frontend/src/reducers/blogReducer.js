import blogService from '../services/blogs'
import { setMessage } from '../reducers/messageReducer'
import { setError } from '../reducers/errorReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE_BLOG':
      return [...state]
    case 'COMMENT_BLOG':
      return [...state]
    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      await blogService.create(blog)
      dispatch(initBlogs())
      dispatch(setMessage(`a new blog ${blog.title} by ${blog.author} added`, 3))
    } catch (exception) {
      dispatch(setError(exception.response.data.error, 3))
    }
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch(initBlogs())
      dispatch(setMessage(`deleted blog ${blog.title} by ${blog.author}`, 3))
    } catch (exception) {
      dispatch(setError(exception.response.data.error, 3))
    }
  }
}

export const updateBlog = (id, content) => {
  return async dispatch => {
    try {
      await blogService.update(id, content)
      dispatch({
        type: 'LIKE_BLOG'
      })
    } catch (exception) {
      dispatch(setError(exception.response.data.error, 3))
    }
  }
}

export const addComment = (id, content) => {
  return async dispatch => {
    try {
      await blogService.addComment(id, content)
      dispatch({
        type: 'COMMENT_BLOG'
      })
    } catch (exception) {
      dispatch(setError(exception.response.data.error, 3))
    }
  }
}

export default reducer
