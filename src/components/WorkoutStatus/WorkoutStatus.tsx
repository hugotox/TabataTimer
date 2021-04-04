import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { toTimeObject } from 'utils'

interface Props {
  reps: number
  sets: number
  timeLeft: number
}

export const WorkoutStatus = ({ reps, sets, timeLeft }: Props) => {
  const { minutes, seconds } = toTimeObject(timeLeft)
  const timeString = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`
  return (
    <View style={style.layout}>
      <View style={style.container}>
        <View style={style.col1}>
          <Text style={style.title}>sets</Text>
          <Text style={style.title}>reps</Text>
        </View>
        <View style={style.col1}>
          <Text style={[style.title, style.titleRight]}>total time</Text>
        </View>
      </View>
      <View style={style.container}>
        <View style={style.col1}>
          <Text style={[style.title, style.number]}>{sets}</Text>
          <Text style={[style.title, style.number]}>{reps}</Text>
        </View>
        <View style={style.col1}>
          <Text style={[style.title, style.time]}>{timeString}</Text>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  layout: {
    alignSelf: 'stretch',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'stretch',
    paddingHorizontal: 25,
  },
  col1: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: '300',
    color: '#ccc',
    flex: 1,
    fontSize: 25,
  },
  titleRight: {
    textAlign: 'right',
  },
  number: {
    fontSize: 35,
    fontWeight: '600',
  },
  time: {
    textAlign: 'right',
    fontSize: 40,
  },
})
