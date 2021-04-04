import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { AppState } from 'store/slice'
import { getTimeDurationLabel } from 'utils'

interface Props {
  data: AppState
}

export const ScheduleInfo = ({ data }: Props) => {
  return (
    <Text style={style.schedule}>
      Workout schedule:{'\n'}
      Countdown: {getTimeDurationLabel(data.initialCountdown)}
      {'\n'}
      Warmup: {getTimeDurationLabel(data.warmup)}
      {'\n'}
      Exercise: {getTimeDurationLabel(data.exercise)}
      {'\n'}
      Rest: {getTimeDurationLabel(data.rest)}
      {'\n'}
      Reps: {data.numReps}
      {'\n'}
      Recovery: {getTimeDurationLabel(data.recovery)}
      {'\n'}
      Sets: {data.numSets}
      {'\n'}
      Cooldown: {getTimeDurationLabel(data.coolDownInterval)}
      {'\n'}
    </Text>
  )
}

const style = StyleSheet.create({
  schedule: {
    color: '#fff',
  },
})
