import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Colors, workoutStyles } from 'themeConstants'
import { formatTimeObject, toTimeObject, useOrientation } from 'utils'

interface Props {
  currentTime: number
  label: string
}

export const Timer = ({ currentTime, label }: Props) => {
  const orientation = useOrientation()
  // @ts-expect-error
  const extra = workoutStyles[label] ? workoutStyles[label] : {}

  return (
    <Text
      style={[
        orientation === 'portrait' ? styles.time : styles.timeLandscape,
        extra,
      ]}
    >
      {formatTimeObject(toTimeObject(currentTime))}
    </Text>
  )
}

const styles = StyleSheet.create({
  time: {
    fontSize: 90,
    fontFamily: 'digital',
    color: Colors.textRed,
  },
  timeLandscape: {
    fontSize: 150,
    fontFamily: 'digital',
    color: Colors.textRed,
  },
})
