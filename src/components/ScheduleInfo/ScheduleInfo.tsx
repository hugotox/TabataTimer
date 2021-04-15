import React, { useMemo } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { useAppSelector } from 'store/hooks'
import {
  selectCooldown,
  selectExercise,
  selectInitialCountdown,
  selectNumRounds,
  selectNumCycles,
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
  const numRounds = useAppSelector(selectNumRounds)
  const recovery = useAppSelector(selectRecovery)
  const numCycles = useAppSelector(selectNumCycles)
  const cooldownInterval = useAppSelector(selectCooldown)
  const totalDuration = useAppSelector(selectTotalDuration)
  const durationLabel = useMemo(() => {
    return getTimeDurationLabel(totalDuration)
  }, [totalDuration])

  return (
    <View>
      <Text style={[styles.text, styles.title]}>Workout schedule:</Text>
      {initialCountdown ? (
        <View style={styles.row}>
          <Text style={styles.label}>Countdown:</Text>
          <Text style={styles.text}>
            {getTimeDurationLabel(initialCountdown, true)}
          </Text>
        </View>
      ) : null}
      {warmup ? (
        <View style={styles.row}>
          <Text style={styles.label}>Warmup:</Text>
          <Text style={styles.text}>{getTimeDurationLabel(warmup, true)}</Text>
        </View>
      ) : null}
      <View style={styles.row}>
        <Text style={styles.label}>Exercise:</Text>
        <Text style={styles.text}>{getTimeDurationLabel(exercise, true)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Rest:</Text>
        <Text style={styles.text}>{getTimeDurationLabel(rest, true)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Rounds:</Text>
        <Text style={styles.text}>{numRounds}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Cycles:</Text>
        <Text style={styles.text}>{numCycles}</Text>
      </View>
      {recovery ? (
        <View style={styles.row}>
          <Text style={styles.label}>Recovery between cycles:</Text>
          <Text style={styles.text}>
            {getTimeDurationLabel(recovery, true)}
          </Text>
        </View>
      ) : null}
      {cooldownInterval ? (
        <View style={styles.row}>
          <Text style={styles.label}>Cooldown:</Text>
          <Text style={styles.text}>
            {getTimeDurationLabel(cooldownInterval, true)}
          </Text>
        </View>
      ) : null}
      <Text style={[styles.text, styles.total]}>TOTAL: {durationLabel}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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
    width: 150,
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
