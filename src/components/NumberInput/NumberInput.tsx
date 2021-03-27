import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export const NumberInput = () => {
  const values: number[] = []
  return (
    <View style={style.container}>
      <View style={style.value}>
        <Text style={style.valueText}>6 Sets</Text>
      </View>
      <Picker style={style.picker} selectedValue={6} onValueChange={() => {}}>
        {values.map((value) => (
          <Picker.Item key={value} label={`${value} sets`} value={value} />
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
  },
  valueText: {
    fontSize: 40,
  },
  picker: {
    backgroundColor: '#73a2e9',
  },
})
