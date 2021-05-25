import { PercentageCircle } from 'components/PercentageCircle'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAppSelector } from 'store/hooks'
import { selectCurrentState } from 'store/selectors'
import { workoutStyles } from 'themeConstants'
import {
  formatTimeObject,
  toTimeObject,
  useOrientation,
  usePrevious,
} from 'utils'

interface Props {
  currentTime: number
  currentStepDuration: number
  color: string
  label: string
  onPressPlay: () => void
}

export const Timer = ({
  currentTime,
  color,
  label,
  currentStepDuration,
  onPressPlay,
}: Props) => {
  const [showBLink, setShowBlink] = useState(false)
  const currentState = useAppSelector(selectCurrentState)
  const previousState = usePrevious(currentState)
  const orientation = useOrientation()
  // @ts-expect-error
  const extra = workoutStyles[label] ? workoutStyles[label] : {}
  color = extra.color || color

  useEffect(() => {
    if (currentState === 'paused') {
      setShowBlink(true)
      const interval = setInterval(() => {
        setShowBlink((showBLink) => !showBLink)
      }, 500)
      return () => {
        clearInterval(interval)
        setShowBlink(false)
      }
    }
    if (previousState === 'paused') {
      setShowBlink(false)
    }
  }, [currentState, previousState])

  return (
    <View style={[styles.container, showBLink && styles.containerBlink]}>
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
        <TouchableOpacity onPress={onPressPlay}>
          <Text
            style={[
              orientation === 'portrait' ? styles.time : styles.timeLandscape,
              { color },
              extra,
            ]}
          >
            {formatTimeObject(toTimeObject(currentTime))}
          </Text>
        </TouchableOpacity>
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
  touchableContainer: {
    // flex: 1,
  },
  containerBlink: {
    opacity: 0.7,
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
  time: {
    fontSize: 120,
    fontFamily: 'monofonto',
  },
  timeLandscape: {
    fontSize: 150,
    fontFamily: 'monofonto',
  },
})
