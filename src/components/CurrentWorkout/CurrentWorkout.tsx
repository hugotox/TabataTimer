import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Colors, workoutStyles } from 'themeConstants'
import { useOrientation } from 'utils'

interface Props {
  label: string
  color: string
}

export const CurrentWorkout = ({ label, color }: Props) => {
  // @ts-expect-error
  const extra = workoutStyles[label] ? workoutStyles[label] : {}
  const orientation = useOrientation()
  return (
    <Text
      style={[
        orientation === 'portrait' ? styles.text : styles.textLandscape,
        { color },
        extra,
      ]}
    >
      {label}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '200',
    color: Colors.textDefault,
    fontSize: 45,
    alignSelf: 'flex-end',
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  textLandscape: {
    position: 'absolute',
    top: 15,
    right: 20,
    fontWeight: '200',
    color: Colors.textDefault,
    fontSize: 45,
  },
})
