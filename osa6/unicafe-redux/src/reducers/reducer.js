const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  const feedback = { ...state }

  switch (action.type) {
    case 'GOOD':
      feedback['good'] += 1
      return state = feedback
    case 'OK':
      state = feedback['ok'] += 1
      return state = feedback
    case 'BAD':
      state = feedback['bad'] += 1
      return state = feedback
    case 'ZERO':
      return state = initialState
    default: return state
  }
}

export default counterReducer
