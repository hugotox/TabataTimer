import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { TimeObject } from 'components/TimeInput'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes/rootStackParamList'
import { MEASURES, PRESETS } from 'screens/settings/data'
import { useAppSelector } from 'store/hooks'
import { AppState } from 'store/slice'

import { Item } from './Item'

export type SettingsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>
export type SettingsRouteProp = RouteProp<RootStackParamList, 'Settings'>

interface SettingsProps {
  navigation: SettingsNavigationProp
}

export const Settings = ({ navigation }: SettingsProps) => {
  const stateData = useAppSelector((state) => state)

  const getValue = (stateKey: keyof AppState) => {
    const data = stateData[stateKey]
    switch (stateKey) {
      case 'numCycles': {
        return data > 0
          ? `${String(data)} ${data === 1 ? 'cycle' : 'cycles'}`
          : ''
      }
      case 'numSets': {
        return data > 0 ? `${String(data)} ${data === 1 ? 'set' : 'sets'}` : ''
      }
      default: {
        const time = data as TimeObject
        let value = ''
        if (time.minutes) {
          value += `${time.minutes} ${
            time.minutes === 1 ? 'minute ' : 'minutes '
          }`
        }
        if (time.seconds) {
          value += `${time.seconds} ${
            time.seconds === 1 ? 'second' : 'seconds'
          }`
        }
        return value
      }
    }
  }

  return (
    <ScrollView>
      <Text style={styles.header}>Measures</Text>
      {MEASURES.items.map((item, i) => (
        <TouchableHighlight
          key={i}
          onPress={() => navigation.navigate(item.route)}
        >
          <Item
            title={item.route}
            icon={item.icon}
            value={getValue(item.stateKey)}
          />
        </TouchableHighlight>
      ))}
      <Text style={styles.header}>Presets</Text>
      {PRESETS.items.map((item, i) => (
        <TouchableHighlight
          key={i}
          onPress={() => navigation.navigate(item.route)}
        >
          <Item title={item.route} icon={item.icon} value="" />
        </TouchableHighlight>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
})
