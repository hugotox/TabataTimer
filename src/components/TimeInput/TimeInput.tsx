import { Picker } from '@react-native-picker/picker'
import { ItemValue } from '@react-native-picker/picker/typings/Picker'
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const MINS_OPTIONS = [...Array(91)].map((_, i) => i)
const SECS_OPTIONS = [...Array(61)].map((_, i) => i)

export interface TimeObject {
  minutes: number
  seconds: number
}

interface Props {
  value: TimeObject
  onChange: (value: TimeObject) => void
}

export const TimeInput = ({ onChange, value }: Props) => {
  const { minutes, seconds } = value

  const handleMinuteChange = (value: ItemValue) => {
    onChange({ minutes: Number(value), seconds })
  }

  const handleSecondsChange = (value: ItemValue) => {
    onChange({ seconds: Number(value), minutes })
  }

  return (
    <View style={style.container}>
      <View style={style.value}>
        <Text style={style.valueText}>
          {minutes > 0 ? `${minutes} Minutes ` : ''}
          {seconds} Seconds
        </Text>
      </View>
      <View style={style.pickers}>
        <Picker
          style={style.picker}
          selectedValue={minutes}
          onValueChange={handleMinuteChange}
        >
          {MINS_OPTIONS.map((_, i) => (
            <Picker.Item key={i} label={String(i)} value={i} />
          ))}
        </Picker>
        <Picker
          style={style.picker}
          selectedValue={seconds}
          onValueChange={handleSecondsChange}
        >
          {SECS_OPTIONS.map((_, i) => (
            <Picker.Item key={i} label={String(i)} value={i} />
          ))}
        </Picker>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  value: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderBottomColor: '#e4e2e2',
    borderBottomWidth: 1,
  },
  valueText: {
    fontSize: 22,
  },
  pickers: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
  },
})
