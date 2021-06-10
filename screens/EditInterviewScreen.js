import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const EditInterviewScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is edit interview screen</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
export default EditInterviewScreen
