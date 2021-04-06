import React, { useMemo } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { AppState } from 'store/slice'
import { Colors, Font } from 'themeConstants'
import { getTimeDurationLabel, getTotalDuration } from 'utils'

interface Props {
  data: AppState
}

export const ScheduleInfo = ({ data }: Props) => {
  const durationLabel = useMemo(() => {
    const totalDuration = getTotalDuration(data)
    return getTimeDurationLabel(totalDuration)
  }, [data])

  return (
    <View>
      <Text style={[style.text, style.title]}>Workout schedule:</Text>
      {data.initialCountdown ? (
        <View style={style.row}>
          <Text style={style.label}>Countdown:</Text>
          <Text style={style.text}>
            {getTimeDurationLabel(data.initialCountdown, true)}
          </Text>
        </View>
      ) : null}
      {data.warmup ? (
        <View style={style.row}>
          <Text style={style.label}>Warmup:</Text>
          <Text style={style.text}>
            {getTimeDurationLabel(data.warmup, true)}
          </Text>
        </View>
      ) : null}
      <View style={style.row}>
        <Text style={style.label}>Exercise:</Text>
        <Text style={style.text}>
          {getTimeDurationLabel(data.exercise, true)}
        </Text>
      </View>
      <View style={style.row}>
        <Text style={style.label}>Rest:</Text>
        <Text style={style.text}>{getTimeDurationLabel(data.rest, true)}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.label}>Reps:</Text>
        <Text style={style.text}>{data.numReps}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.label}>Set duration:</Text>
        <Text style={style.text}>
          {getTimeDurationLabel(
            (data.exercise + data.rest) * data.numReps,
            true
          )}
        </Text>
      </View>
      {data.recovery ? (
        <View style={style.row}>
          <Text style={style.label}>Recovery:</Text>
          <Text style={style.text}>
            {getTimeDurationLabel(data.recovery, true)}
          </Text>
        </View>
      ) : null}
      <View style={style.row}>
        <Text style={style.label}>Sets:</Text>
        <Text style={style.text}>{data.numSets}</Text>
      </View>
      {data.coolDownInterval ? (
        <View style={style.row}>
          <Text style={style.label}>Cooldown:</Text>
          <Text style={style.text}>
            {getTimeDurationLabel(data.coolDownInterval, true)}
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
