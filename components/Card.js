import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
// onSelectLeftBtn = ViewDetails=================
//props->onSelectLeftBtn, title, startTime, endTime
const imgUrl =
  'https://thumbs.dreamstime.com/b/person-looking-job-blocks-magnifying-glass-close-up-s-hand-desk-181249768.jpg'
const Card = (props) => {
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
            <Text style={styles.time}>{props.startTime}</Text>
            <Text style={styles.time}>{props.endTime}</Text>
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
    // flex: 1,
    height: 300,
    margin: 20,
    borderRadius: 20,
  },
  time: {
    fontFamily: 'open-sans',
    fontSize: 12,
    color: 'black',
    paddingVertical: 10,
  },
})

export default Card
