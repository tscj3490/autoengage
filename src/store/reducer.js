import { combineReducers } from 'redux'

import session from './session'
import auth from './auth'
import chat from './chat'

export default combineReducers({
  auth,
  chat,
  session
})
