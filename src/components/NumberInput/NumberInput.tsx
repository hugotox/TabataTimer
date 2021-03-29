import { Picker } from '@react-native-picker/picker'
import { ItemValue } from '@react-native-picker/picker/typings/Picker'
import { RouteProp } from '@react-navigation/core'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { RootStackParamList } from 'routes'
import { updateValue } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { NumberKeys } from 'store/slice'

type TimeInputRouteProp = RouteProp<RootStackParamList, 'Number of Sets'>

interface Props {
  route: TimeInputRouteProp
}

const OPTIONS = [...Array(100)].map((_, i) => i + 1)

export const NumberInput = ({ route }: Props) => {
  const { stateKey } = route.params
  const dispatch = useAppDispatch()
  const value = useAppSelector<number>((state) => state[stateKey as NumberKeys])

  const handleOnChange = (value: ItemValue) => {
    dispatch(updateValue({ stateKey, value }))
  }

  let valueLabel = `${value} `
  if (stateKey === 'numCycles') {
    valueLabel += `${value === 1 ? 'Cycle' : 'Cycles'}`
  } else if (stateKey === 'numSets') {
    valueLabel += `${value === 1 ? 'Set' : 'Sets'}`
  }

  return (
    <View style={style.container}>
      <View style={style.value}>
        <Text style={style.valueText}>{valueLabel}</Text>
      </View>
      <Picker
        style={style.picker}
        selectedValue={value}
        onValueChange={handleOnChange}
      >
        {OPTIONS.map((value) => (
          <Picker.Item
            key={value}
            label={`${value} ${stateKey === 'numCycles' ? 'cycles' : 'sets'}`}
            value={value}
          />
        ))}
      </Picker>
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
  picker: {
    // backgroundColor: '#73a2e9',
  },
})
