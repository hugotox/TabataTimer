import { ItemValue } from '@react-native-picker/picker/typings/Picker'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Load } from 'screens/load'
import { InitialCountdown } from 'screens/measures/initial-countdown'
import { MEASURES, PRESETS } from 'screens/settings'
import { RootStackParamList } from 'utils/navigation'

export type InputNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Input'
>
export type InputRouteProp = RouteProp<RootStackParamList, 'Input'>

interface InputProps {
  navigation: InputNavigationProp
  route: InputRouteProp
}

export const Input = ({ navigation, route }: InputProps) => {
  const [selected, setSelected] = useState(4)
  const [values, setValues] = useState<number[]>([])
  const { title } = route.params.section
  const { index } = route.params

  useEffect(() => {
    const data: number[] = []
    for (let index = 1; index <= 99; index++) {
      data.push(index)
    }
    setValues(data)
  }, [])

  const handleValueChange = (itemValue: ItemValue, itemIndex: number) => {
    setSelected(Number(itemValue))
  }

  let Component: any = null

  if (title === MEASURES) {
    switch (index) {
      case 0:
        Component = InitialCountdown
        break
    }
  } else if (title === PRESETS) {
    switch (index) {
      case 0:
        Component = Load
        break
    }
  }

  if (Component) {
    return <Component navigation={navigation} route={route} />
  }

  return null
}
