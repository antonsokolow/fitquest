import {createStore, combineReducers} from 'redux'

import {
  credentialsReducer,
  profileReducer,
  subscriptionReducer,
  dataReducer,
  waterReducer,
  tariffsReducer,
  activityReducer,
} from './reducers'

const rootReducer = combineReducers({
  credentials: credentialsReducer,
  profile: profileReducer,
  subscription: subscriptionReducer,
  water: waterReducer,
  tariffs: tariffsReducer,
  activity: activityReducer,
})
const store = createStore(rootReducer)

export default store
