import { Picker } from '@react-native-picker/picker'
import { ItemValue } from '@react-native-picker/picker/typings/Picker'
import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { RootStackParamList } from 'routes'
import { updateValue } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { Colors, Font } from 'themeConstants'
import { getTimeDurationLabel } from 'utils'
import { toTimeObject } from 'utils/toTimeObject'

type TimeInputRouteProp = RouteProp<RootStackParamList, 'Initial Countdown'>

interface Props {
  route: TimeInputRouteProp
}

const MINS_OPTIONS = [...Array(91)].map((_, i) => i)
const SECS_OPTIONS = [...Array(61)].map((_, i) => i)

export const TimeInput = ({ route }: Props) => {
  const { stateKey } = route.params
  const dispatch = useAppDispatch()
  const value = useAppSelector<number>((state) => state[stateKey])
  const { minutes, seconds } = toTimeObject(value)

  const handleMinuteChange = (value: ItemValue) => {
    dispatch(updateValue({ stateKey, value: Number(value) * 60 + seconds }))
  }

  const handleSecondsChange = (value: ItemValue) => {
    dispatch(updateValue({ stateKey, value: minutes * 60 + Number(value) }))
  }

  return (
    <View style={style.container}>
      <View style={style.value}>
        <Text style={style.valueText}>{getTimeDurationLabel(value)}</Text>
      </View>
      <View style={style.pickers}>
        <Picker
          style={style.picker}
          itemStyle={style.pickerItem}
          selectedValue={minutes}
          onValueChange={handleMinuteChange}
        >
          {MINS_OPTIONS.map((_, i) => (
            <Picker.Item key={i} label={`${String(i)} minutes`} value={i} />
          ))}
        </Picker>
        <Picker
          style={style.picker}
          itemStyle={style.pickerItem}
          selectedValue={seconds}
          onValueChange={handleSecondsChange}
        >
          {SECS_OPTIONS.map((_, i) => (
            <Picker.Item key={i} label={`${String(i)} seconds`} value={i} />
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
    backgroundColor: Colors.background,
  },
  value: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderBottomColor: Colors.separator,
    borderBottomWidth: 1,
  },
  valueText: {
    fontSize: 22,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
  },
  pickers: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pickerItem: {
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
  },
})
