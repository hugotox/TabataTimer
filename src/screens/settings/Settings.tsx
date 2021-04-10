import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes/rootStackParamList'
import { MEASURES, PRESETS } from 'screens/settings/data'
import { useAppSelector } from 'store/hooks'
import { selectTotalDuration } from 'store/selectors'
import { SettingsKeys } from 'store/slice'
import { Colors, Font } from 'themeConstants'
import { getTimeDurationLabel } from 'utils'

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
  const totalDuration = useAppSelector(selectTotalDuration)

  const getValue = (stateKey: SettingsKeys) => {
    const data = stateData[stateKey]
    switch (stateKey) {
      case 'numSets': {
        return data > 0 ? `${String(data)} ${data === 1 ? 'set' : 'sets'}` : ''
      }
      case 'numReps': {
        return data > 0 ? `${String(data)} ${data === 1 ? 'rep' : 'reps'}` : ''
      }
      default: {
        return getTimeDurationLabel(data)
      }
    }
  }

  const durationLabel = useMemo(() => {
    return getTimeDurationLabel(totalDuration)
  }, [totalDuration])

  return (
    <ScrollView style={styles.container}>
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
      {/* <Text style={styles.header}>Presets</Text> */}
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
  container: {
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: 20,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
    // backgroundColor: Colors.background,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  duration: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  durationText: {
    fontSize: 18,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
    textAlign: 'right',
    marginTop: 10,
  },
})
