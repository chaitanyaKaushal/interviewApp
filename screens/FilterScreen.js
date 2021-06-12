import React, { useCallback, useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Text, Button, Alert } from 'react-native'
import * as interviewActions from '../centralstore/actions/interviews'

import { useSelector, useDispatch } from 'react-redux'
const FilterScreen = (props) => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const filteredList = useSelector((state) => state.interviews.filter)
  const submitHandler = () => {
    console.log(text)
    dispatch(interviewActions.filterFilter(text))
    dispatch(interviewActions.loadInterviewCandidates())
    Alert.alert('Match Found!', JSON.stringify(filteredList), [
      {
        text: 'Okay!',
        style: 'destructive',
      },
    ])
  }
  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Enter Email</Text>
      <TextInput
        style={styles.input}
        value={text}
        keyboardType='email-address'
        onChangeText={(tx) => setText(tx)}
      />
      <View style={styles.btnContainer}>
        <Button onPress={submitHandler} title='Search' color='royalblue' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    borderWidth: 10,
  },
  btnContainer: {
    height: '20%',
    width: '100%',
  },
})

FilterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Filter Candidate',
  }
}

export default FilterScreen
