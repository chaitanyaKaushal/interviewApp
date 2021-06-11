import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Button,
} from 'react-native'

const imgUrl =
  'https://thumbs.dreamstime.com/b/person-looking-job-blocks-magnifying-glass-close-up-s-hand-desk-181249768.jpg'
const Card = (props) => {
  let {
    startDate,
    startMonth,
    startHour,
    startMinutes,
    endDate,
    endMonth,
    endHour,
    endMinutes,
  } = props

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onSelect}>
        <View style={styles.maincard}>
          <View style={styles.content}>
            <ImageBackground source={{ uri: imgUrl }} style={styles.bgImg}>
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.timeContainer}>
            <Text styles={styles.time}>
              {startDate}
              {'/'}
            </Text>
            <Text styles={styles.time}>{startMonth} </Text>
            <Text styles={styles.time}>
              {startHour}
              {':'}
            </Text>
            <Text styles={styles.time}>
              {startMinutes}
              {'    till '}
            </Text>

            <Text styles={styles.time}>
              {endDate}
              {'/'}
            </Text>
            <Text styles={styles.time}>{endMonth} </Text>
            <Text styles={styles.time}>
              {endHour}
              {':'}
            </Text>
            <Text styles={styles.time}>{endMinutes}</Text>

            <Button
              color='royalblue'
              onPress={props.onPressDelete}
              title='Delete'
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  maincard: {
    elevation: 15,
    backgroundColor: 'floralwhite',
    // overflow: 'hidden',
    borderRadius: 15,
  },
  content: {
    flexDirection: 'row',
    height: '85%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    color: 'floralwhite',
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
  },

  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bgImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  container: {
    overflow: 'hidden',
    height: 300,
    margin: 20,
    borderRadius: 20,
  },
  time: {
    fontFamily: 'open-sans',
    fontSize: 10,
    color: 'black',
    paddingVertical: 10,
  },
})

export default Card
