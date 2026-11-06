import React, { useCallback, useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { useAppSelector } from 'store/hooks'
import { selectCurrentState } from 'store/selectors'
import { useMount, usePrevious } from 'utils'

const ONE_SEC = 1000
const RADIUS = 45
const CIRCUMFERENCE = RADIUS * 2 * Math.PI
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
interface Props {
  color: string
  currentStepDuration: number
  currentTime: number
  animated?: boolean
  label?: string
}

const animate = (
  toValue: number,
  currentStepDuration: number,
  progressValueRefCurrent: Animated.Value
) => {
  return Animated.timing(progressValueRefCurrent, {
    toValue,
    duration: currentStepDuration * ONE_SEC,
    useNativeDriver: false, // SVG props are not supported by the native driver
    easing: Easing.linear,
  }).start()
}

export const PercentageCircle = ({
  animated = true,
  color,
  currentStepDuration,
  currentTime,
  label,
}: Props) => {
  const currentState = useAppSelector(selectCurrentState)
  const previousState = usePrevious(currentState)
  const progressValueRef = useRef(new Animated.Value(0))
  const progressValueRefCurrent = progressValueRef.current
  const previousLabel = usePrevious(label)

  const strokeDashoffset = progressValueRefCurrent.interpolate({
    inputRange: [0, 100],
    outputRange: [CIRCUMFERENCE, 0],
  })

  const initAnimation = useCallback(
    (duration: number) => {
      animate(100, duration, progressValueRefCurrent)
    },
    [progressValueRefCurrent]
  )

  useMount(() => {
    if (animated) {
      initAnimation(currentStepDuration)
    }
  })

  // handle on pause
  useEffect(() => {
    if (animated) {
      if (currentState === 'paused') {
        progressValueRefCurrent.stopAnimation()
      } else if (previousState === 'paused') {
        initAnimation(currentTime)
      }
    }
  }, [
    animated,
    currentState,
    currentTime,
    initAnimation,
    previousState,
    progressValueRefCurrent,
  ])

  // handle moving next/previous
  useEffect(() => {
    if (animated && label) {
      if (
        (previousLabel && label !== previousLabel) ||
        currentTime === currentStepDuration
      ) {
        progressValueRefCurrent.setValue(0)
        if (currentState === 'paused') {
          progressValueRefCurrent.stopAnimation()
        } else {
          animate(100, currentStepDuration, progressValueRefCurrent)
        }
      }
    }
  }, [
    animated,
    currentState,
    currentStepDuration,
    currentTime,
    label,
    previousLabel,
    progressValueRefCurrent,
  ])

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 100 100"
      style={style.container}
    >
      <AnimatedCircle
        cx="50"
        cy="50"
        r={RADIUS}
        strokeDashoffset={strokeDashoffset}
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2.5"
        strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
        fill="transparent"
      />
    </Svg>
  )
}

const style = StyleSheet.create({
  container: {
    transform: [{ rotate: '-90deg' }],
  },
})
