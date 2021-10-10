const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.error
    default:
      return state
  }
}

let timeoutId

export const setError = (error, timeout) => {
  return dispatch => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'SET_ERROR',
        error: ''
      })
    }, timeout * 1000)

    dispatch({
      type: 'SET_ERROR',
      error
    })
  }
}

export default reducer
