const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    default:
      return state
  }
}

let timeoutId

export const setMessage = (message, timeout) => {
  return dispatch => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'SET_MESSAGE',
        message: ''
      })
    }, timeout * 1000)

    dispatch({
      type: 'SET_MESSAGE',
      message
    })
  }
}

export default reducer
