import React, { useState } from 'react'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import InterviewNavigator from './navigation/InterviewNavigator'
import { LogBox } from 'react-native'
LogBox.ignoreAllLogs()
import { combineReducers, createStore } from 'redux'
import interviewsReducers from './centralstore/reducers/interviews'
import { Provider } from 'react-redux'
import { applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import { init, init2, deleteComplete1, deleteComplete2 } from './db'

init()
  .then(() => {
    console.log('Initialized database')
  })
  .catch((err) => {
    console.log('Initializing Failed')
    console.log(err)
  })

init2()
  .then(() => {
    console.log('Initialized interview_candidates')
  })
  .catch((err) => {
    console.log('interview_candidates Failed')
    console.log(err)
  })
// deleteComplete1()
//   .then(() => console.log('delete2'))
//   .catch((err) => console.log('failed2'))
// deleteComplete2()
//   .then(() => console.log('delete1'))
//   .catch((err) => console.log('failed1'))

const rootReducer = combineReducers({
  interviews: interviewsReducers,
  // candidates: candidatesReducers,
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false)
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }
  return (
    <Provider store={store}>
      <InterviewNavigator />
    </Provider>
  )
}
