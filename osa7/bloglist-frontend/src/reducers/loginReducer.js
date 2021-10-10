import loginService from '../services/login'
import blogService from '../services/blogs'
import { setError } from '../reducers/errorReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return action.data
    default:
      return state
  }
}

export const initUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        data: user
      })
    }
  }
}

export const loginUser = userData => {
  return async dispatch => {
    try {
      const user = await loginService.login(userData)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch({
        type: 'LOGIN_USER',
        data: user
      })
    } catch (exception) {
      dispatch(setError('wrong username or password', 3))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT_USER',
      data: null
    })
  }
}

export default reducer
