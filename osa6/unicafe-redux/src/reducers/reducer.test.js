import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = undefined

    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState
    deepFreeze(state)

    const action = {
      type: 'GOOD'
    }

    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('neutral is incremented', () => {
    const state = initialState
    deepFreeze(state)

    const action = {
      type: 'OK'
    }

    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const state = initialState
    deepFreeze(state)

    const action = {
      type: 'BAD'
    }

    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('all feedbacks are incremented', () => {
    const state = initialState
    deepFreeze(state)

    let action = {
      type: 'GOOD'
    }

    let newState = counterReducer(state, action)

    action = {
      type: 'OK'
    }

    newState = counterReducer(newState, action)

    action = {
      type: 'BAD'
    }

    newState = counterReducer(newState, action)
    expect(newState).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })
  })

  test('reset button generates an initial state', () => {
    const state = initialState
    deepFreeze(state)

    let action = {
      type: 'GOOD'
    }

    let newState = counterReducer(state, action)

    action = {
      type: 'ZERO'
    }

    newState = counterReducer(newState, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})
