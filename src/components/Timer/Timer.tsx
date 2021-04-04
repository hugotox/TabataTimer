import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'
import { formatTimeObject, isPortrait, toTimeObject } from 'utils'

interface Props {
  currentTime: number
}

export const Timer = ({ currentTime }: Props) => {
  const [orientation, setOrientation] = useState(
    isPortrait() ? 'portrait' : 'landscape'
  )

  useEffect(() => {
    const rotateHandler = () => {
      setOrientation(isPortrait() ? 'portrait' : 'landscape')
    }
    Dimensions.addEventListener('change', rotateHandler)
    return () => {
      Dimensions.removeEventListener('change', rotateHandler)
    }
  }, [])

  return (
    <Text style={orientation === 'portrait' ? style.time : style.timeLandscape}>
      {formatTimeObject(toTimeObject(currentTime))}
    </Text>
  )
}

const style = StyleSheet.create({
  time: {
    fontSize: 90,
    fontFamily: 'calculator',
    color: '#fff',
  },
  timeLandscape: {
    fontSize: 200,
    fontFamily: 'calculator',
    color: '#fff',
  },
})
