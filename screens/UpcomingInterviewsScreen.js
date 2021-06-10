import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Card from '../components/Card'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton.js'
const UpcomingInterviewsScreen = (props) => {
  return (
    <Card
      title='Interview 1'
      onSelect={() => {
        props.navigation.navigate({
          routeName: 'EditInterview',
        })
      }}
      startTime='10:00'
      endTime='12:00'
    />
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

UpcomingInterviewsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Upcoming Interviews',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            onPress={() => navData.navigation.navigate('NewInterview')}
            iconName='md-add'
            title='Add'
          />
        </HeaderButtons>
      )
    },
  }
}

export default UpcomingInterviewsScreen
