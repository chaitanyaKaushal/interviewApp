import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const NewInterviewScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is new interview screen</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
export default NewInterviewScreen
