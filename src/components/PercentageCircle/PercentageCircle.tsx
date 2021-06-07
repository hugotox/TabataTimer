import React, { useCallback, useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { useAppSelector } from 'store/hooks'
import { selectCurrentState } from 'store/selectors'
import { useMount, usePrevious } from 'utils'

const ONE_SEC = 1000
const RADIUS = 45
const CIRCUMFERENCE = RADIUS * 2 * Math.PI
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
    useNativeDriver: true,
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
  const circleSVGRef = useRef(null)
  const progressValueRef = useRef(new Animated.Value(0))
  const progressValueRefCurrent = progressValueRef.current
  const previousCurrentTime = usePrevious(currentTime)
  const previousLabel = usePrevious(label)

  const setCirclePercentageLength = useCallback((value: number) => {
    const strokeDashoffset = CIRCUMFERENCE - (value / 100) * CIRCUMFERENCE
    // @ts-expect-error
    circleSVGRef?.current?.setNativeProps({ strokeDashoffset })
  }, [])

  const initAnimation = useCallback(
    (duration: number) => {
      progressValueRef.current.addListener(({ value }) => {
        setCirclePercentageLength(value)
      })
      animate(100, duration, progressValueRefCurrent)
    },
    [progressValueRefCurrent, setCirclePercentageLength]
  )

  useMount(() => {
    if (animated) {
      initAnimation(currentStepDuration)
    }
  })

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

  useEffect(() => {
    if (animated && label && previousLabel && label !== previousLabel) {
      progressValueRefCurrent.setValue(0)
      animate(100, currentStepDuration, progressValueRefCurrent)
    }
  }, [
    animated,
    currentStepDuration,
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
      <Circle
        cx="50"
        cy="50"
        r={RADIUS}
        ref={circleSVGRef}
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