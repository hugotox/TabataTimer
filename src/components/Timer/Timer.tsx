import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useAppSelector } from 'store/hooks'
import { timeObjToSeconds } from 'utils'

export const Timer = () => {
  const [currentTime, setCurrentTime] = useState(0)
  const data = useAppSelector((state) => state)

  return (
    <View>
      <Text style={style.text}>{currentTime}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  text: {},
})
