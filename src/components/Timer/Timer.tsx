import { PercentageCircle } from 'components/PercentageCircle'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { useAppSelector } from 'store/hooks'
import { selectCurrentState } from 'store/selectors'
import { workoutStyles } from 'theme'
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
    <View
      style={[
        styles.container,
        orientation === 'landscape' && styles.containerLandscape,
        showBLink && styles.containerBlink,
      ]}
    >
      <View
        style={[
          styles.innerContainer,
          orientation === 'landscape' && styles.innerContainerLandscape,
        ]}
      >
        <PercentageCircle
          color="#363636"
          currentStepDuration={1}
          currentTime={1}
          animated={false}
        />
      </View>
      <View
        style={[
          styles.innerContainer,
          orientation === 'landscape' && styles.innerContainerLandscape,
        ]}
      >
        <PercentageCircle
          color={color}
          currentStepDuration={currentStepDuration}
          currentTime={currentTime}
          label={label}
        />
      </View>
      <View
        style={[
          styles.innerContainer,
          orientation === 'landscape' && styles.innerContainerLandscape,
        ]}
      >
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
    padding: 20,
  },
  containerLandscape: {
    padding: 0,
  },
  touchableContainer: {
    // flex: 1,
  },
  containerBlink: {
    opacity: 0.7,
  },
  innerContainer: {
    position: 'absolute',
    left: 20,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  innerContainerLandscape: {
    left: 0,
    top: 0,
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
