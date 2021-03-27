import { TimeInput, TimeObject } from 'components/TimeInput'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { setInitialCountdown } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectInitialCountdown } from 'store/selectors'

export const InitialCountdown = () => {
  const initialCountdown = useAppSelector(selectInitialCountdown)
  const dispatch = useAppDispatch()
  const { minutes, seconds } = initialCountdown

  const handleOnChange = (value: TimeObject) => {
    dispatch(setInitialCountdown(value))
  }

  return (
    <View style={style.container}>
      <TimeInput onChange={handleOnChange} value={{ minutes, seconds }} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
})
