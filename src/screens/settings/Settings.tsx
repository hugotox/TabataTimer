import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes/rootStackParamList'
import { MEASURES, PRESETS } from 'screens/settings/data'
import { useAppSelector } from 'store/hooks'
import { AppState } from 'store/slice'
import { getTimeDurationLabel, getTotalDuration } from 'utils'

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
        return getTimeDurationLabel(data)
      }
    }
  }

  const durationLabel = useMemo(() => {
    const totalDuration = getTotalDuration(stateData)
    return getTimeDurationLabel(totalDuration)
  }, [stateData])

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
      <View style={styles.duration}>
        <Text style={styles.durationText}>Total duration: {durationLabel}</Text>
      </View>
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
  duration: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  durationText: {
    fontSize: 18,
  },
})
