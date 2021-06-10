import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Colors, Font } from 'themeConstants'
import { toTimeObject, useOrientation } from 'utils'

interface Props {
  intervals: number
  reps: number
  timeLeft: number
}

export const WorkoutStatus = ({ intervals, reps, timeLeft }: Props) => {
  const { minutes, seconds } = toTimeObject(timeLeft)
  const timeString = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`
  const repsString = String(reps).padStart(2, '0')
  const intervalsString = String(intervals).padStart(2, '0')
  const orientation = useOrientation()

  return (
    <View
      style={
        orientation === 'portrait' ? styles.layout : styles.layoutLandscape
      }
    >
      {orientation === 'portrait' ? (
        <>
          <View style={styles.container}>
            <View style={styles.col1}>
              <Text style={styles.title}>reps</Text>
              <Text style={styles.title}>intervals</Text>
            </View>
            <View style={styles.col1}>
              <Text style={[styles.title, styles.titleRight]}>time left</Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.col1}>
              <Text style={[styles.title, styles.number]}>{repsString}</Text>
              <Text style={[styles.title, styles.number]}>
                {intervalsString}
              </Text>
            </View>
            <View style={styles.col1}>
              <Text style={[styles.title, styles.time]}>{timeString}</Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.landscapeContainer}>
            <View style={styles.landscapeItem}>
              <Text style={[styles.title, styles.landscapeTitle]}>reps</Text>
              <Text style={[styles.title, styles.titleRight, styles.number]}>
                {repsString}
              </Text>
            </View>
            <View style={styles.landscapeItem}>
              <Text style={[styles.title, styles.landscapeTitle]}>
                intervals
              </Text>
              <Text style={[styles.title, styles.titleRight, styles.number]}>
                {intervalsString}
              </Text>
            </View>
            <View style={styles.landscapeItem}>
              <Text style={[styles.title, styles.landscapeTitle]}>
                time left
              </Text>
              <Text style={[styles.title, styles.titleRight, styles.number]}>
                {timeString}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    alignSelf: 'stretch',
  },
  layoutLandscape: {
    flex: 0.7,
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 25,
  },
  col1: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: Font.weightNormal,
    color: Colors.textDefault,
    flex: 1,
    fontSize: 20,
  },
  titleRight: {
    textAlign: 'right',
  },
  number: {
    fontSize: 50,
    fontFamily: 'monofonto',
  },
  time: {
    textAlign: 'right',
    fontSize: 50,
    fontFamily: 'monofonto',
  },
  landscapeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  landscapeItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 10,
  },
  landscapeTitle: {
    flex: 0.5,
  },
})
