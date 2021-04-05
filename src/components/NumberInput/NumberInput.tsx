import { Picker } from '@react-native-picker/picker'
import { ItemValue } from '@react-native-picker/picker/typings/Picker'
import { RouteProp } from '@react-navigation/core'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { RootStackParamList } from 'routes'
import { updateValue } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { Colors, Font } from 'themeConstants'

type TimeInputRouteProp = RouteProp<RootStackParamList, 'Number of Sets'>

interface Props {
  route: TimeInputRouteProp
}

const OPTIONS = [...Array(100)].map((_, i) => i + 1)

export const NumberInput = ({ route }: Props) => {
  const { stateKey } = route.params
  const dispatch = useAppDispatch()
  const value = useAppSelector<number>((state) => state[stateKey])

  const handleOnChange = (value: ItemValue) => {
    dispatch(updateValue({ stateKey, value: Number(value) }))
  }

  let valueLabel = `${value} `
  if (stateKey === 'numReps') {
    valueLabel += `${value === 1 ? 'Rep' : 'Reps'}`
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
        itemStyle={style.pickerItem}
        selectedValue={value}
        onValueChange={handleOnChange}
      >
        {OPTIONS.map((value) => (
          <Picker.Item
            key={value}
            label={`${value} ${stateKey === 'numReps' ? 'reps' : 'sets'}`}
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
  picker: {
    backgroundColor: Colors.background,
  },
  pickerItem: {
    color: '#fff',
    fontWeight: Font.weightNormal,
  },
})
