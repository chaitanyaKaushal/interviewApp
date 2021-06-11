// import React, { useReducer, useEffect } from 'react'
// import { View, Text, TextInput, StyleSheet } from 'react-native'

// const INPUT_CHANGE = 'INPUT_CHANGE'
// const INPUT_BLUR = 'INPUT_BLUR'
// const inputReducer = (state, action) => {
//   switch (action.type) {
//     case INPUT_CHANGE:
//       return {
//         ...state,
//         value: action.value,
//         isValid: action.isValid,
//       }
//     case INPUT_BLUR:
//       return {
//         ...state,
//         touched: true,
//       }
//     default:
//       return state
//   }
// }

// const Input = (props) => {
//   const [state, dispatch] = useReducer(inputReducer, {
//     value: props.initialValue ? props.initialValue : '',
//     isValid: props.initialValue ? true : false, //yeh dekho
//     touched: false, //user actually typed on this field or not
//   })

//   const { id, onInputChange } = props

//   const lostFocusHandler = () => {
//     dispatch({ type: INPUT_BLUR })
//   }
//   useEffect(() => {
//     if (state.touched) {
//       onInputChange(id, state.value, state.isValid)
//     }
//   }, [state.isValid, state.value, state.touched, onInputChange, id])

//   const textChangeHandler = (text) => {
//     const emailRegex =
//       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     let isValid = true
//     if (props.required && text.trim().length === 0) {
//       isValid = false
//     }
//     if (props.email && !emailRegex.test(text.toLowerCase())) {
//       isValid = false
//     }
//     if (props.min != null && +text < props.min) {
//       isValid = false
//     }
//     if (props.max != null && +text > props.max) {
//       isValid = false
//     }
//     if (props.minLength != null && text.length < props.minLength) {
//       isValid = false
//     }
//     dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
//   }
//   return (
//     <View style={styles.formControl}>
//       <Text style={styles.label}>{props.label}</Text>
//       <TextInput
//         {...props}
//         style={styles.input}
//         value={state.value}
//         onChangeText={textChangeHandler}
//         onBlur={lostFocusHandler}
//       />
//       {!state.isValid && state.value.length === 0 && state.touched && (
//         <Text style={{ color: 'firebrick' }}>{props.errorText}</Text>
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   formControl: {
//     width: '100%',
//   },
//   label: {
//     fontFamily: 'open-sans-bold',
//     marginVertical: 8,
//   },
//   input: {
//     paddingHorizontal: 2,
//     paddingVertical: 5,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//   },
// })

// export default Input

import React, { useReducer, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import interviewsReducer from '../centralstore/reducers/interviews'

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      }
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      }
    default:
      return state
  }
}

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false,
  })

  const { onInputChange, id } = props

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid)
    }
  }, [inputState, onInputChange, id])

  const adminInterviews = useSelector(
    (state) => state.interviews.adminInterviews
  )

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let isValid = true
    if (props.required && text.trim().length === 0) {
      isValid = false
    }
    // if (props.email && !emailRegex.test(text.toLowerCase())) {
    //   isValid = false
    //   //email validation
    // }
    if (props.email) {
      if (text.split(' ').length < 2) {
        isValid = false
      } else {
        for (const x in text.split(' ')) {
          console.log(text.split(' ')[x].toLowerCase())
          if (!emailRegex.test(text.split(' ')[x].toLowerCase())) {
            isValid = false
            break
          }
        }
      }

      //   isValid = true
    }
    if (props.min != null && +text < props.min) {
      console.log('Min Problem')
      isValid = false
    }
    if (props.max != null && +text > props.max) {
      isValid = false
      console.log('Max Problem')
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false
      console.log('MinLength Problem')
    }
    if (props.maxLength != null && text.length > props.maxLength) {
      isValid = false
      console.log('Maxlength Problem')
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
  }

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR })
  }

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
  },
})

export default Input
