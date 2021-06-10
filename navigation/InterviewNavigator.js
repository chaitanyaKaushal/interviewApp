import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import UpcomingInterviewsScreen from '../screens/UpcomingInterviewsScreen'
import NewInterviewScreen from '../screens/NewInterviewScreen'
import EditInterviewScreen from '../screens/EditInterviewScreen'

const InterviewNavigator = createStackNavigator({
  UpcomingInterviews: UpcomingInterviewsScreen,
  NewInterview: NewInterviewScreen,
  EditInterview: EditInterviewScreen,
})

export default createAppContainer(InterviewNavigator)
