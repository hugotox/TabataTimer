import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Colors, Font } from 'theme'
import { toTimeObject, useOrientation } from 'utils'

interface Props {
  intervals: number
  cycles: number
  timeLeft: number
}

export const WorkoutStatus = ({ intervals, cycles, timeLeft }: Props) => {
  const { minutes, seconds } = toTimeObject(timeLeft)
  const timeString = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`
  const cyclesString = String(cycles).padStart(2, '0')
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
              <Text style={styles.title}>cycles</Text>
              <Text style={styles.title}>intervals</Text>
            </View>
            <View style={styles.col1}>
              <Text style={[styles.title, styles.titleRight]}>time left</Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.col1}>
              <Text style={[styles.title, styles.number]}>{cyclesString}</Text>
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
              <Text style={[styles.title, styles.landscapeTitle]}>cycles</Text>
              <Text style={[styles.title, styles.titleRight, styles.number]}>
                {cyclesString}
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
    paddingHorizontal: 50,
    paddingTop: 140,
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
    fontSize: 45,
    fontFamily: 'monofonto',
  },
  time: {
    textAlign: 'right',
    fontSize: 45,
    fontFamily: 'monofonto',
  },
  landscapeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  landscapeItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
    marginVertical: 10,
  },
  landscapeTitle: {
    flex: 0.6,
  },
})
