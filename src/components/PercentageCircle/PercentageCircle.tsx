import React, { useCallback, useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
// import { usePrevious } from 'utils'

interface Props {
  color: string
  percentage: number
}

const ONE_SEC = 1000

export const PercentageCircle = ({ color, percentage }: Props) => {
  const radius = 45
  const circumference = radius * 2 * Math.PI
  const progressCircle = useRef(null)
  const progressAnimation = useRef(new Animated.Value(0)).current

  const animation = useCallback(
    (toValue: number) => {
      return Animated.timing(progressAnimation, {
        toValue,
        duration: ONE_SEC,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    },
    [progressAnimation]
  )

  const setStrokeDashoffset = useCallback(
    (value: number) => {
      const strokeDashoffset = circumference - (value / 100) * circumference
      if (progressCircle?.current) {
        // @ts-expect-error
        progressCircle?.current?.setNativeProps({ strokeDashoffset })
      }
    },
    [circumference]
  )

  useEffect(() => {
    const animInstance = animation(percentage)
    animInstance.start()
    if (percentage === 100) {
      setTimeout(() => {
        animInstance.reset()
        setStrokeDashoffset(0)
      }, ONE_SEC - 10)
    }
  }, [animation, percentage, setStrokeDashoffset])

  useEffect(() => {
    progressAnimation.addListener(({ value }) => {
      setStrokeDashoffset(value)
    })
  }, [progressAnimation, setStrokeDashoffset])

  // useEffect(() => {
  //   setStrokeDashoffset(percentage)
  // }, [percentage, setStrokeDashoffset])

  console.log('PERCENTAGE', percentage)

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
        r={radius}
        ref={progressCircle}
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2.5"
        strokeDasharray={`${circumference} ${circumference}`}
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
