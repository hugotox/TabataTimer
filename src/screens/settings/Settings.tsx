import { StackNavigationProp } from '@react-navigation/stack'
import { ListItem } from 'components/ListItem'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes/rootStackParamList'
import { MEASURES, PRESETS } from 'screens/settings/data'
import { useAppSelector } from 'store/hooks'
import { selectTimer, selectTotalDuration } from 'store/selectors'
import { SettingsKeys } from 'store/timerSlice'
import { Colors, Font } from 'themeConstants'
import { getTimeDurationLabel } from 'utils'

export type SettingsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>
// export type SettingsRouteProp = RouteProp<RootStackParamList, 'Settings'>

interface SettingsProps {
  navigation: SettingsNavigationProp
}

export const Settings = ({ navigation }: SettingsProps) => {
  const stateData = useAppSelector(selectTimer)
  const totalDuration = useAppSelector(selectTotalDuration)

  const getValue = (stateKey?: SettingsKeys) => {
    if (stateKey && stateData[stateKey]) {
      const data = stateData[stateKey]
      switch (stateKey) {
        case 'numCycles': {
          return data > 0
            ? `${String(data)} ${data === 1 ? 'cycle' : 'cycles'}`
            : ''
        }
        case 'numRounds': {
          return data > 0
            ? `${String(data)} ${data === 1 ? 'round' : 'rounds'}`
            : ''
        }
        default: {
          return getTimeDurationLabel(data)
        }
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
          <ListItem
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
          <ListItem
            title={item.route}
            icon={item.icon}
            value={item.description}
          />
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
