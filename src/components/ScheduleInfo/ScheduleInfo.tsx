import React, { useMemo } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { useAppSelector } from 'store/hooks'
import {
  selectCooldown,
  selectExercise,
  selectInitialCountdown,
  selectNumReps,
  selectNumSets,
  selectRecovery,
  selectRest,
  selectTotalDuration,
  selectWarmup,
} from 'store/selectors'
import { Colors, Font } from 'themeConstants'
import { getTimeDurationLabel } from 'utils'

export const ScheduleInfo = () => {
  const initialCountdown = useAppSelector(selectInitialCountdown)
  const warmup = useAppSelector(selectWarmup)
  const exercise = useAppSelector(selectExercise)
  const rest = useAppSelector(selectRest)
  const numReps = useAppSelector(selectNumReps)
  const recovery = useAppSelector(selectRecovery)
  const numSets = useAppSelector(selectNumSets)
  const cooldownInterval = useAppSelector(selectCooldown)
  const totalDuration = useAppSelector(selectTotalDuration)
  const durationLabel = useMemo(() => {
    return getTimeDurationLabel(totalDuration)
  }, [totalDuration])

  return (
    <View>
      <Text style={[style.text, style.title]}>Workout schedule:</Text>
      {initialCountdown ? (
        <View style={style.row}>
          <Text style={style.label}>Countdown:</Text>
          <Text style={style.text}>
            {getTimeDurationLabel(initialCountdown, true)}
          </Text>
        </View>
      ) : null}
      {warmup ? (
        <View style={style.row}>
          <Text style={style.label}>Warmup:</Text>
          <Text style={style.text}>{getTimeDurationLabel(warmup, true)}</Text>
        </View>
      ) : null}
      <View style={style.row}>
        <Text style={style.label}>Exercise:</Text>
        <Text style={style.text}>{getTimeDurationLabel(exercise, true)}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.label}>Rest:</Text>
        <Text style={style.text}>{getTimeDurationLabel(rest, true)}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.label}>Reps:</Text>
        <Text style={style.text}>{numReps}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.label}>Set duration:</Text>
        <Text style={style.text}>
          {getTimeDurationLabel((exercise + rest) * numReps, true)}
        </Text>
      </View>
      {recovery ? (
        <View style={style.row}>
          <Text style={style.label}>Recovery:</Text>
          <Text style={style.text}>{getTimeDurationLabel(recovery, true)}</Text>
        </View>
      ) : null}
      <View style={style.row}>
        <Text style={style.label}>Sets:</Text>
        <Text style={style.text}>{numSets}</Text>
      </View>
      {cooldownInterval ? (
        <View style={style.row}>
          <Text style={style.label}>Cooldown:</Text>
          <Text style={style.text}>
            {getTimeDurationLabel(cooldownInterval, true)}
          </Text>
        </View>
      ) : null}
      <Text style={[style.text, style.total]}>TOTAL: {durationLabel}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  title: {
    marginBottom: 10,
  },
  text: {
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
    fontSize: 16,
  },
  label: {
    width: 100,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
    fontSize: 16,
    fontStyle: 'italic',
  },
  total: {
    marginTop: 10,
    textAlign: 'right',
  },
})
