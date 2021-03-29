import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useAppSelector } from 'store/hooks'
import { getTimeDurationLabel, getTotalDuration, useInterval } from 'utils'

export const Timer = () => {
  const data = useAppSelector((state) => state)
  const [currentTime, setCurrentTime] = useState(getTotalDuration(data))

  useInterval(() => {
    setCurrentTime(currentTime - 1)
  }, 1000)

  return (
    <View>
      <Text style={style.text}>{getTimeDurationLabel(currentTime)}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  text: {
    fontSize: 60,
    color: '#fff',
  },
})
