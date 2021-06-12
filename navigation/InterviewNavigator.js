import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import UpcomingInterviewsScreen from '../screens/UpcomingInterviewsScreen'
import NewInterviewScreen from '../screens/NewInterviewScreen'
import FilterScreen from '../screens/FilterScreen'

const InterviewNavigator = createStackNavigator(
  {
    UpcomingInterviews: UpcomingInterviewsScreen,
    NewInterview: NewInterviewScreen,
    Filter: FilterScreen,
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
