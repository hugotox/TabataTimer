import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { workoutStyles } from 'themeConstants'
import { formatTimeObject, toTimeObject, useOrientation } from 'utils'

interface Props {
  currentTime: number
  color: string
  label: string
}

export const Timer = ({ currentTime, color, label }: Props) => {
  const orientation = useOrientation()
  // @ts-expect-error
  const extra = workoutStyles[label] ? workoutStyles[label] : {}

  return (
    <Text
      style={[
        orientation === 'portrait' ? styles.time : styles.timeLandscape,
        { color },
        extra,
      ]}
    >
      {formatTimeObject(toTimeObject(currentTime))}
    </Text>
  )
}

const styles = StyleSheet.create({
  time: {
    fontSize: 120,
    fontFamily: 'digital',
  },
  timeLandscape: {
    fontSize: 150,
    fontFamily: 'digital',
  },
})
