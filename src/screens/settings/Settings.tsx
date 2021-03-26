import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes/rootStackParamList'
import { MEASURES, PRESETS } from 'screens/settings/data'

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
  return (
    <ScrollView>
      <Text style={styles.header}>Measures</Text>
      {MEASURES.items.map((item, i) => (
        <TouchableHighlight
          key={i}
          onPress={() => navigation.navigate(item.route)}
        >
          <Item title={item.route} icon={item.icon} />
        </TouchableHighlight>
      ))}
      <Text style={styles.header}>Presets</Text>
      {PRESETS.items.map((item, i) => (
        <TouchableHighlight
          key={i}
          onPress={() => navigation.navigate(item.route)}
        >
          <Item title={item.route} icon={item.icon} />
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
