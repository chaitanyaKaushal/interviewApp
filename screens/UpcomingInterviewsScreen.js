import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const UpcomingInterviewsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is upcoming interviews screen</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
export default UpcomingInterviewsScreen
