import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { workoutStyles } from 'theme'
import { useOrientation } from 'utils'

interface Props {
  label: string
  next: string
  color: string
}

export const CurrentWorkout = ({ label, color, next }: Props) => {
  // @ts-expect-error
  const extra = workoutStyles[label] ? workoutStyles[label] : {}
  const orientation = useOrientation()
  return (
    <View
      style={
        orientation === 'portrait' ? styles.container : styles.containerLand
      }
    >
      <Text style={[{ color }, extra, styles.text]}>{label}</Text>
      <Text style={[{ color }, extra, styles.next]}>
        {next ? `next: ${next}` : ' '}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    paddingHorizontal: 25,
    paddingTop: 35,
  },
  containerLand: {
    position: 'absolute',
    top: 15,
    right: 60,
  },
  text: {
    alignSelf: 'flex-end',
    fontWeight: '200',
    fontSize: 45,
  },
  next: {
    fontWeight: '200',
    fontSize: 30,
    marginLeft: 20,
    paddingTop: 5,
  },
})
