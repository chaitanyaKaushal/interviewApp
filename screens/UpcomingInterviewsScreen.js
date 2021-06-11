// import React, { useState, useCallback, useEffect } from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Alert,
//   // ActivityIndicator,
// } from 'react-native'
// const UpcomingInterviewsScreen = (props) => {
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)

//   const deleteHandlerButton = async (id) => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       await dispatch(deleteInterview(id))
//     } catch (err) {
//       setError(err)
//     }
//     setIsLoading(false)
//   }

//   useEffect(() => {
//     if (error) {
//       Alert.alert(error.name, error.message, [
//         { text: 'OK', style: 'destructive' },
//       ])
//     }
//   }, [error])

//   const deleteHandler = (id) => {
//     Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
//       {
//         text: 'No',
//         style: 'default',
//       },
//       {
//         text: 'Yes',
//         style: 'destructive',
//         onPress: () => deleteHandlerButton(id),
//       },
//     ])
//   }

//   const loadInterviews = useCallback(async () => {
//     setError(null)
//     // setIsLoading(true)
//     try {
//       await dispatch(fetchInterviews())
//     } catch (err) {
//       setError(err)
//     }
//     // setIsLoading(false)
//   }, [dispatch])

//   useEffect(() => {
//     const willFocusSub = props.navigation.addListener('willFocus', () => {
//       loadInterviews()
//     })
//     return () => {
//       willFocusSub.remove()
//     }
//   }, [loadInterviews])

//   useEffect(() => {
//     loadInterviews()
//   }, [dispatch, loadInterviews])
//   /////

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text>{`Error: ${error.name}`}</Text>
//         <Text>{error.message}</Text>
//       </View>
//     )
//   }

//   // if (isLoading) {
//   //   return (
//   //     <View style={styles.centered}>
//   //       <ActivityIndicator size='large' color='royalblue' />
//   //     </View>
//   //   )
//   // }

//   // if (!isLoading && !adminProducts) {
//   //   return (
//   //     <View style={styles.centered}>
//   //       <Text>No interviews found. Maybe start scheduling some!</Text>
//   //     </View>
//   //   )
//   // }

//   return (
//     <FlatList
//       data={adminProducts}
//       keyExtractor={(item) => item.id}
//       renderItem={(itemData) => (
//         <Card
//           title={itemData.item.title}
//           onSelect={() => {
//             props.navigation.navigate({
//               routeName: 'NewInterview',
//               params: { interviewId: itemData.item.id },
//             })
//           }}
//           startTime={itemData.item.startTime}
//           endTime={itemData.item.endTime}
//           onPressDelete={() => deleteHandler(itemData.item.id)}
//         />
//       )}
//     />
//     ///////////
//   )
// }

import React, { useState, useEffect } from 'react'
import { FlatList, Text, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../components/Card'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import * as interviewActions from '../centralstore/actions/interviews'
const UpcomingInterviewsScreen = (props) => {
  const adminInterviews = useSelector(
    (state) => state.interviews.adminInterviews
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(interviewActions.loadInterviews())
  }, [dispatch])
  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', ' You want to delete this item?', [
      {
        text: 'No',
        style: 'default',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => dispatch(interviewActions.deleteInterview(id)),
      },
    ])
  }
  return (
    <FlatList
      data={adminInterviews}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <Card
          title={itemData.item.title}
          startDate={itemData.item.startDate}
          startMonth={itemData.item.startMonth}
          startHour={itemData.item.startHour}
          startMinutes={itemData.item.startMinutes}
          endDate={itemData.item.endDate}
          endMonth={itemData.item.endMonth}
          endHour={itemData.item.endHour}
          endMinutes={itemData.item.endMinutes}
          onSelect={() => {
            props.navigation.navigate('NewInterview', {
              interviewId: itemData.item.id,
            })
          }}
          onPressDelete={() => deleteHandler(itemData.item.id)}
        />
      )}
    />
  )
}

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
