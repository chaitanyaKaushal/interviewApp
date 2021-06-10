import React, { useState } from 'react'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import InterviewNavigator from './navigation/InterviewNavigator'
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
  return <InterviewNavigator />
}
