import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'
import errorReducer from './reducers/errorReducer'

const reducer = combineReducers({
  user: loginReducer,
  users: userReducer,
  blogs: blogReducer,
  message: messageReducer,
  error: errorReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
