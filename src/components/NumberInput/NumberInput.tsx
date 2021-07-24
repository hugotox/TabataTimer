import { Picker } from '@react-native-picker/picker'
import { ItemValue } from '@react-native-picker/picker/typings/Picker'
import { RouteProp } from '@react-navigation/core'
import React from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { RootStackParamList } from 'routes'
import { clearRemainingCustomNames, updateValue } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectTimer } from 'store/selectors'
import { Colors, Font } from 'theme'

type TimeInputRouteProp = RouteProp<RootStackParamList, 'Number of Intervals'>

interface Props {
  route: TimeInputRouteProp
}

const OPTIONS = [...Array(100)].map((_, i) => i + 1)

export const NumberInput = ({ route }: Props) => {
  const { stateKey } = route.params
  const dispatch = useAppDispatch()
  const timerData = useAppSelector(selectTimer)
  const value = timerData[stateKey]

  const handleOnChange = (value: ItemValue) => {
    value = Number(value)
    dispatch(updateValue({ stateKey, value }))
    dispatch(clearRemainingCustomNames(value))
  }

  let valueLabel = `${value} `
  if (stateKey === 'numIntervals') {
    valueLabel += `${value === 1 ? 'Interval' : 'Intervals'}`
  } else if (stateKey === 'numCycles') {
    valueLabel += `${value === 1 ? 'Cycle' : 'Cycles'}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.value}>
        <Text style={styles.valueText}>{valueLabel}</Text>
      </View>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={value}
        onValueChange={handleOnChange}
      >
        {OPTIONS.map((value) => (
          <Picker.Item
            key={value}
            label={`${value} ${
              stateKey === 'numIntervals' ? 'intervals' : 'cycles'
            }`}
            value={value}
          />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
  },
  value: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    borderBottomColor: Colors.separator,
    borderBottomWidth: 1,
  },
  valueText: {
    fontSize: 22,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
  },
  picker: {
    backgroundColor: Colors.background,
    color: '#fff',
    flex: 1,
    marginLeft: Platform.OS === 'ios' ? 0 : 25,
  },
  pickerItem: {
    color: '#fff',
    fontWeight: Font.weightNormal,
  },
})
