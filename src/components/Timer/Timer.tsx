import { PercentageCircle } from 'components/PercentageCircle'
import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { workoutStyles } from 'themeConstants'
import { formatTimeObject, toTimeObject, useOrientation } from 'utils'

interface Props {
  currentTime: number
  currentStepDuration: number
  color: string
  label: string
}

export const Timer = ({
  currentTime,
  color,
  label,
  currentStepDuration,
}: Props) => {
  const orientation = useOrientation()
  // @ts-expect-error
  const extra = workoutStyles[label] ? workoutStyles[label] : {}
  color = extra.color || color

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <PercentageCircle
          color="#363636"
          currentStepDuration={1}
          currentTime={1}
          animated={false}
        />
      </View>
      <View style={styles.innerContainer}>
        <PercentageCircle
          color={color}
          currentStepDuration={currentStepDuration}
          currentTime={currentTime}
        />
      </View>
      <View style={styles.innerContainer}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  innerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  circle: {
    width: '100%',
    height: '100%',
  },
  time: {
    fontSize: 120,
    fontFamily: 'monofonto',
  },
  timeLandscape: {
    fontSize: 150,
    fontFamily: 'monofonto',
  },
})
