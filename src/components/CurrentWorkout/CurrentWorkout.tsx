import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Colors, workoutStyles } from 'themeConstants'

interface Props {
  label: string
  color: string
}

export const CurrentWorkout = ({ label, color }: Props) => {
  // @ts-expect-error
  const extra = workoutStyles[label] ? workoutStyles[label] : {}
  return <Text style={[styles.text, { color }, extra]}>{label}</Text>
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
})
