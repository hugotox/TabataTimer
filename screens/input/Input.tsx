import { Picker } from '@react-native-picker/picker'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'

interface InputProps {
  navigation: StackNavigationProp<any>
}

export const Input = ({ navigation, ...rest }: InputProps) => {
  // console.log('REST', rest.route.params)
  const [selected, setSelected] = useState(4)
  const [values, setValues] = useState<number[]>([])

  useEffect(() => {
    const data: number[] = []
    for (let index = 1; index <= 99; index++) {
      data.push(index)
    }
    setValues(data)
  }, [])
  return (
    <View style={style.container}>
      <View style={style.value}>
        <Text style={style.valueText}>{selected} Sets</Text>
      </View>
      <Picker
        style={style.picker}
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) => setSelected(Number(itemValue))}
      >
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
