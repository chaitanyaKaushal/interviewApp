import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import UpcomingInterviewsScreen from '../screens/UpcomingInterviewsScreen'
import NewInterviewScreen from '../screens/NewInterviewScreen'

const InterviewNavigator = createStackNavigator(
  {
    UpcomingInterviews: UpcomingInterviewsScreen,
    NewInterview: NewInterviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'royalblue',
      },
      headerTintColor: 'floralwhite',
      headerTitleStyle: {
        textAlign: 'center',
        fontFamily: 'open-sans-bold',
      },
    },
  }
)

export default createAppContainer(InterviewNavigator)
