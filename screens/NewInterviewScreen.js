// import React, { useState, useEffect, useCallback, useReducer } from 'react'
// import {
//   View,
//   StyleSheet,
//   Button,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native'
// import { HeaderButtons, Item } from 'react-navigation-header-buttons'
// import HeaderButton from '../components/HeaderButton'
// import Input from '../components/Input'
// import { useDispatch, useSelector } from 'react-redux'
// import * as interviewActions from '../centralstore/actions/interviews'
// // import DateTimePicker from '@react-native-community/datetimepicker'
// import DateTimePickerModal from 'react-native-modal-datetime-picker'

// const FORM_UPDATE = 'UPDATE'

// const formReducer = (state, action) => {
//   switch (action.type) {
//     case FORM_UPDATE:
//       const updatedValues = {
//         ...state.inputValues,
//         [action.input]: action.value,
//       }
//   const updatedValidities = {
//     ...state.inputValidities,
//     [action.input]: action.isValid,
//   }
//   let formIsValid = true
//   for (const key in updatedValidities) {
//     if (!updatedValidities[key]) {
//       formIsValid = false
//       break
//     }
//   }
//   return {
//     ...state,
//     inputValues: updatedValues,
//     inputValidities: updatedValidities,
//     formIsValid: formIsValid,
//   }
// default:
//   return state
//   }
// }

// const NewInterviewScreen = (props) => {
//   ///////////////////////////
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
//   const [startTime, setStartTime] = useState('')
//   const [endTime, setEndTime] = useState('')
//   const showDatePicker = () => {
//     setDatePickerVisibility(true)
//   }

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false)
//   }

//   const handleConfirm = (date) => {
//     console.log('A date has been picked: ', date)
//     if (!startTime) {
//       setStartTime(date)
//       hideDatePicker()
//       return
//     } else {
//       setEndTime(date)
//       hideDatePicker()
//       return
//     }
//   }
//   /////////////////////////

//   const dispatch = useDispatch()
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const interviewId = props.navigation.getParam('interviewId')
//   const editedInterview = useSelector((state) =>
//     state.interviews.adminProducts.find(
//       (interview) => interview.id === interviewId
//     )
//   )

//   const [formState, dispatchFormState] = useReducer(formReducer, {
//     inputValues: {
//       title: editedInterview ? editedInterview.title : '', // to pre-populate existing interview values
//       startTime: editedInterview ? editedInterview.startTime : '',
//       endTime: editedInterview ? editedInterview.endTime : '',
//       candidates: editedInterview ? editedInterview.candidates : [],
//     },
//     inputValidities: {
//       // whether that input is valid or not
//       title: editedInterview ? true : false, // input is valid if we are in edit mode because it was previously successfully submitted
//       startTime: editedInterview ? true : false,
//       endTime: editedInterview ? true : false,
//       candidates: editedInterview ? true : false,
//     },
//     formIsValid: editedInterview ? true : false, //is form valid overall when all states are valid
//   })

//   const submitHandler = useCallback(async () => {
//     if (!formState.formIsValid) {
//       Alert.alert(
//         'Wrong Input(s)!',
//         'Please check for the errors in the form',
//         [{ text: 'Okay' }]
//       )
//       return
//     }
//     setError(null)
//     setIsLoading(true)
//     try {
//       if (interviewId) {
//         await dispatch(
//           interviewActions.updateInterview(
//             interviewId,
//             formState.inputValues.title,
//             formState.inputValues.startTime,
//             formState.inputValues.endTime,
//             formState.inputValues.candidates
//           )
//         )
//       } else {
//         await dispatch(
//           interviewActions.createInterview(
//             formState.inputValues.title,
//             formState.inputValues.startTime,
//             formState.inputValues.endTime,
//             formState.inputValues.candidates
//           )
//         )
//       }
//       props.navigation.goBack()
//     } catch (err) {
//       setError(err)
//     }
//   }, [dispatch, formState])

//   useEffect(() => {
//     props.navigation.setParams({ submit: submitHandler })
//   }, [submitHandler])

//   useEffect(() => {
//     if (error) {
//       Alert.alert(`Error: ${error.name}`, error.message, [{ text: 'Okay' }])
//     }
//   })
//   // Validating Text
//   const inputChangeHandler = useCallback(
//     (inputIdentifier, inputValue, inputValidity) => {
//       dispatchFormState({
//         type: FORM_UPDATE,
//         value: inputValue,
//         isValid: inputValidity,
//         input: inputIdentifier,
//       })
//     },
//     [dispatchFormState]
//   )
//   if (isLoading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size='large' color={Colors.primary} />
//       </View>
//     )
//   }
//   return (
//     <ScrollView>
//       <View style={styles.form}>
//         <Input
//           id='title'
//           keyboardType='default'
//           autoCapitalize='words'
//           autoCorrect={false}
//           returnKeyType='next'
//           errorText='Please enter a valid title'
//           label='Title'
//           onInputChange={inputChangeHandler}
//           initialValue={editedInterview ? editedInterview.title : ''}
//           required
//         />
// <View style={styles.btnContainer}>
//   <Button title='Select Start Time' onPress={showDatePicker} />
// </View>
// <View style={styles.btnContainer}>
//   <Button
//     title='Select End Time'
//     onPress={showDatePicker}
//     disabled={!startTime}
//   />
// </View>
// <DateTimePickerModal
//   isVisible={isDatePickerVisible}
//   mode='datetime'
//   onConfirm={handleConfirm}
//   onCancel={hideDatePicker}
// />
//       </View>
//     </ScrollView>
//   )
// }
// const styles = StyleSheet.create({
//   form: {
//     margin: 20,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnContainer: {
//     color: 'royalblue',
//     justifyContent: 'flex-start',
//     width: '100%',
//     margin: 10,
//   },
// })

// NewInterviewScreen.navigationOptions = (navData) => {
//   const submitFunction = navData.navigation.getParam('submit')
//   return {
//     headerTitle: navData.navigation.getParam('interviewId')
//       ? 'Edit Interview'
//       : 'Create New Interview',
//     headerRight: () => {
//       return (
//         <HeaderButtons HeaderButtonComponent={HeaderButton}>
//           <Item
//             onPress={submitFunction}
//             iconName='md-checkmark'
//             title='Submit'
//           />
//         </HeaderButtons>
//       )
//     },
//   }
// }

// export default NewInterviewScreen
import React, { useState, useEffect, useCallback, useReducer } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Button,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'

import * as interviewActions from '../centralstore/actions/interviews'
import Input from '../components/Input'
import interviewsReducer from '../centralstore/reducers/interviews'
//testing
// import DateTimePickerModal from 'react-native-modal-datetime-picker'

//

const FORM_UPDATE = 'FORM_UPDATE'
const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    }
    let formIsValid = true
    for (const key in updatedValidities) {
      if (!updatedValidities[key]) {
        formIsValid = false
        break
      }
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: formIsValid,
    }
  }
  return state
}

const NewInterviewScreen = (props) => {
  const dispatch = useDispatch()
  const interviewId = props.navigation.getParam('interviewId')
  const editedInterview = useSelector((state) =>
    state.interviews.adminInterviews.find(
      (interview) => interview.id === interviewId
    )
  )
  const adminInterviews = useSelector(
    (state) => state.interviews.adminInterviews
  )
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedInterview ? editedInterview.title : '',
      //   startTime: editedInterview ? editedInterview.startTime : '',
      startDate: editedInterview ? editedInterview.startDate : '',
      startMonth: editedInterview ? editedInterview.startMonth : '',
      startHour: editedInterview ? editedInterview.startHour : '',
      startMinutes: editedInterview ? editedInterview.startMinutes : '',
      endDate: editedInterview ? editedInterview.endDate : '',
      endMonth: editedInterview ? editedInterview.endMonth : '',
      endHour: editedInterview ? editedInterview.endHour : '',
      endMinutes: editedInterview ? editedInterview.endMinutes : '',
      candidates: editedInterview ? editedInterview.candidates : '', // yeh dekho, list string hogi vese
    },
    inputValidities: {
      title: editedInterview ? true : false,
      startDate: editedInterview ? true : false,
      startMonth: editedInterview ? true : false,
      startHour: editedInterview ? true : false,
      startMinutes: editedInterview ? true : false,
      endDate: editedInterview ? true : false,
      endMonth: editedInterview ? true : false,
      endHour: editedInterview ? true : false,
      endMinutes: editedInterview ? true : false,
      candidates: editedInterview ? true : false,
    },
    formIsValid: editedInterview ? true : false,
  })

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input(s)', 'Check your form!', [
        { text: 'Okay', style: 'destructive' },
      ])
      return
    }
    let startTime = formState.inputValues.startDate.concat(
      formState.inputValues.startMonth,
      formState.inputValues.startHour,
      formState.inputValues.startMinutes
    )
    let endTime = formState.inputValues.endDate.concat(
      formState.inputValues.endMonth,
      formState.inputValues.endHour,
      formState.inputValues.endMinutes
    )
    if (+startTime >= +endTime) {
      Alert.alert('Wrong!', 'Meeting cannot end before it starts', [
        { text: 'Okay', style: 'destructive' },
      ])
      return
    }
    for (let i = 0; i < adminInterviews.length; i++) {
      if (editedInterview && adminInterviews[i].id === editedInterview.id) {
        continue
      }
      const candidateString = adminInterviews[i].candidates
      for (const x in formState.inputValues.candidates.split(' ')) {
        if (
          candidateString.search(
            formState.inputValues.candidates.split(' ')[x]
          ) != -1
        ) {
          let existingEndTime = adminInterviews[i].endDate.concat(
            adminInterviews[i].endMonth,
            adminInterviews[i].endHour,
            adminInterviews[i].endMinutes
          )
          if (+startTime < +existingEndTime) {
            Alert.alert(
              'Sorry!',
              `${
                formState.inputValues.candidates.split(' ')[x]
              } is not available!`,
              [{ text: 'Okay', style: 'destructive' }]
            )
            return
          }
        }
      }
    }
    ////////////////////////////////////////////////////////////////////////////
    // startTime = formState.inputValidities.startDate.concat(
    //   formState.inputValidities.startMon,
    //   formState.inputValidities.startHour,
    //   formState.inputValidities.startMinutes
    // )
    if (editedInterview) {
      dispatch(
        interviewActions.updateInterview(
          interviewId,
          formState.inputValues.title,
          formState.inputValues.startDate,
          formState.inputValues.startMonth,
          formState.inputValues.startHour,
          formState.inputValues.startMinutes,
          formState.inputValues.endDate,
          formState.inputValues.endMonth,
          formState.inputValues.endHour,
          formState.inputValues.endMinutes,
          formState.inputValues.candidates
        )
      ) ///yaha daalo
    } else {
      dispatch(
        interviewActions.createInterview(
          formState.inputValues.title,
          formState.inputValues.startDate,
          formState.inputValues.startMonth,
          formState.inputValues.startHour,
          formState.inputValues.startMinutes,
          formState.inputValues.endDate,
          formState.inputValues.endMonth,
          formState.inputValues.endHour,
          formState.inputValues.endMinutes,
          formState.inputValues.candidates
        )
      ) /// yaha daalo
    }
    props.navigation.goBack()
  }, [dispatch, interviewId, formState]) //yaha daalo

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  //   const textChangeHandler = (inputId, text) => {
  //     let isValid = false
  //     if (text.trim().length > 0) {
  //       isValid = true
  //     }
  //     dispatchForm({
  //       type: FORM_UPDATE,
  //       value: text,
  //       isValid: isValid,
  //       input: inputId,
  //     })
  //   }

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      //   let valueInsert = inputValue
      //   if (inputIdentifier === 'startTime') {
      //     valueInsert = finalStartDate
      //   } else if (inputIdentifier === 'endTime') {
      //     valueInsert = finalEndDate
      //   }
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      })
    },
    [dispatchFormState]
  )

  //testing
  //   const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  //   const [finalStartDate, setFinalStartDate] = useState(null)
  //   const [finalEndDate, setFinalEndDate] = useState(null)
  //   const showDatePicker = () => {
  //     setDatePickerVisibility(true)
  //   }

  //   const hideDatePicker = () => {
  //     setDatePickerVisibility(false)
  //   }

  //   const handleConfirm = useCallback(
  //     (inputIdentifier, date) => {
  //       console.log('A date has been picked: ', date)
  //       // if (!startTime) {
  //       //   setStartTime(date)
  //       //   hideDatePicker()
  //       //   return
  //       // } else {
  //       //   setEndTime(date)
  //       //   hideDatePicker()
  //       //   return
  //       // }
  //       //   dispatchFormState({
  //       //     type: FORM_UPDATE,
  //       //     value: inputValue,
  //       //     isValid: inputValidity,
  //       //     input: inputIdentifier,
  //       //   })
  //       if (!finalStartDate) {
  //         setFinalStartDate(date)
  //         dispatchFormState({
  //           type: FORM_UPDATE,
  //           value: new Date(date).getTime().toString(),
  //           isValid: true,
  //           inputIdentifier: 'startTime',
  //         })
  //         hideDatePicker()
  //         return
  //       }
  //       dispatchFormState({
  //         type: FORM_UPDATE,
  //         value: new Date(date).getTime().toString(),
  //         isValid: true,
  //         inputIdentifier: 'endTime',
  //       })
  //       setFinalEndDate(date)
  //       hideDatePicker()
  //     },
  //     [dispatchFormState, formState]
  //   )
  //   //

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='title'
            label='Title'
            errorText='Please enter a valid title!'
            keyboardType='default'
            autoCapitalize='words'
            // autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedInterview ? editedInterview.title : ''}
            initiallyValid={!!editedInterview}
            email={false}
            required
          />
          {/* {editedInterview && ( */}
          <Input
            id='startDate'
            label='Start Date'
            errorText='Please enter a valid start time!'
            // keyboardType='default'
            keyboardType='number-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedInterview ? editedInterview.startDate : ''}
            initiallyValid={!!editedInterview}
            required
            maxLength={2}
            minLength={2}
            email={false}
            max={31}
            min={1}
          />
          <Input
            id='startMonth'
            label='Start Month'
            errorText='Please enter a valid start time!'
            // keyboardType='default'
            keyboardType='number-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedInterview ? editedInterview.startMonth : ''}
            initiallyValid={!!editedInterview}
            required
            maxLength={2}
            minLength={2}
            max={12}
            email={false}
            min={1}
          />
          <Input
            id='startHour'
            label='Start Hour'
            errorText='Please enter a valid start time!'
            keyboardType='number-pad'
            // keyboardType='default'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedInterview ? editedInterview.startHour : ''}
            initiallyValid={!!editedInterview}
            required
            maxLength={2}
            minLength={2}
            min={0}
            email={false}
            max={24}
          />
          <Input
            id='startMinutes'
            label='Start Minutes'
            errorText='Please enter a valid start time!'
            // keyboardType='default'
            keyboardType='number-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedInterview ? editedInterview.startMinutes : ''}
            initiallyValid={!!editedInterview}
            required
            maxLength={2}
            minLength={2}
            email={false}
            max={59}
          />

          {/* )} */}
          {/* {editedInterview ? null : (
            <Input
              id='price'
              label='Price'
              errorText='Please enter a valid price!'
              keyboardType='decimal-pad'
              returnKeyType='next'
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )} */}
          {/* {editedInterview && ( */}
          <Input
            id='endDate'
            label='End Date'
            errorText='Please enter a valid end time!'
            // keyboardType='default'
            keyboardType='number-pad'
            // autoCapitalize='sentences'
            autoCorrect
            // multiline
            // numberOfLines={3}
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedInterview ? editedInterview.endDate : ''}
            initiallyValid={!!editedInterview}
            required
            // minLength={5}
            maxLength={2}
            minLength={2}
            max={31}
            email={false}
            min={1}
          />
          <Input
            id='endMonth'
            label='End Month'
            errorText='Please enter a valid end time!'
            // keyboardType='default'
            keyboardType='number-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedInterview ? editedInterview.endMonth : ''}
            initiallyValid={!!editedInterview}
            required
            maxLength={2}
            minLength={2}
            max={12}
            email={false}
            min={1}
          />
          <Input
            id='endHour'
            label='End Hour'
            errorText='Please enter a valid end time!'
            // keyboardType='default'
            keyboardType='number-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedInterview ? editedInterview.endHour : ''}
            initiallyValid={!!editedInterview}
            required
            maxLength={2}
            minLength={2}
            min={0}
            email={false}
            max={24}
          />
          <Input
            id='endMinutes'
            label='End Minutes'
            errorText='Please enter a valid end time!'
            // keyboardType='default'
            keyboardType='number-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedInterview ? editedInterview.endMinutes : ''}
            initiallyValid={!!editedInterview}
            required
            maxLength={2}
            minLength={2}
            max={59}
            email={false}
          />

          <Input
            id='candidates'
            label='Candidates'
            errorText='Please enter atleast two candidates with valid emails seperated by space!'
            keyboardType='email-address'
            // autoCapitalize='sentences'
            autoCorrect
            multiline
            // numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedInterview ? editedInterview.candidates : ''}
            initiallyValid={!!editedInterview}
            required
            email={true}
            // minLength={5}
          />
          {/* <View style={styles.btnContainer}>
            <Button title='Select Start Time' onPress={showDatePicker} />
          </View>
          <View style={styles.btnContainer}>
            <Button
              title='Select End Time'
              onPress={showDatePicker}
              disabled={!finalStartDate}
            />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='datetime'
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          /> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({})
NewInterviewScreen.navigationOptions = (navData) => {
  const submit = navData.navigation.getParam('submit')
  return {
    headerTitle: navData.navigation.getParam('interviewId')
      ? 'Edit Interview'
      : 'Create Interview',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item onPress={submit} iconName='md-checkmark' title='Submit' />
        </HeaderButtons>
      )
    },
  }
}
export default NewInterviewScreen
