import { PercentageCircle } from 'components/PercentageCircle'
import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { workoutStyles } from 'themeConstants'
import { formatTimeObject, toTimeObject, useOrientation } from 'utils'

interface Props {
  currentTime: number
  percentage: number
  color: string
  label: string
}

export const Timer = ({ currentTime, percentage, color, label }: Props) => {
  const orientation = useOrientation()
  // @ts-expect-error
  const extra = workoutStyles[label] ? workoutStyles[label] : {}
  color = extra.color || color

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <PercentageCircle color={color} percentage={percentage} />
      </View>
      <Text
        style={[
          orientation === 'portrait' ? styles.time : styles.timeLandscape,
          { color },
          extra,
        ]}
      >
        {formatTimeObject(toTimeObject(currentTime))}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // backgroundColor: 'red',
    alignSelf: 'stretch',
    height: '100%',
    // flex: 1,
  },
  circle: {
    position: 'absolute',
    left: 50,
    top: 100,
    width: 300,
    height: 300,
  },
  time: {
    position: 'absolute',
    left: 150,
    top: 200,
    fontSize: 120,
    fontFamily: 'digital',
  },
  timeLandscape: {
    fontSize: 150,
    fontFamily: 'digital',
  },
})
