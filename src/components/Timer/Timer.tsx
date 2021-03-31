import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import React, { useState } from 'react'
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native'
import { useAppSelector } from 'store/hooks'
import {
  getTimeDurationLabel,
  getTotalDuration,
  toTimeObject,
  useInterval,
} from 'utils'

const window = Dimensions.get('window')

export const Timer = () => {
  const data = useAppSelector((state) => state)
  const [currentTime, setCurrentTime] = useState(getTotalDuration(data))

  const [fontsLoaded] = useFonts({
    Impact: require('assets/fonts/Impact.ttf'),
  })

  const { hours, minutes, seconds } = toTimeObject(currentTime)

  useInterval(() => {
    setCurrentTime(currentTime - 1)
  }, 1000)

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <View>
      <Text style={style.text}>
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </Text>
      <Text>Width: {window.width}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  text: {
    fontSize: 90,
    fontFamily: 'Impact',
    color: '#fff',
  },
})
