const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

let timeoutId

export const setNotification = (notification, timeout) => {
  return dispatch => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: ''
      })
    }, timeout * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
  }
}

export default reducer
