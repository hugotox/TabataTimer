import React, { useState } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { formatTimeObject, toTimeObject, useInterval } from 'utils'

const window = Dimensions.get('window')

export const Timer = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state)
  const { currentState } = data
  const [currentTime, setCurrentTime] = useState<number>(0)

  const isPaused = currentState === 'paused'

  useInterval(
    () => {
      setCurrentTime(currentTime - 1)
    },
    isPaused ? null : 1000,
  )

  return (
    <View>
      <Text style={style.text}>
        {formatTimeObject(toTimeObject(currentTime))}
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
