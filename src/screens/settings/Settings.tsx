import { StackNavigationProp } from '@react-navigation/stack'
import { ListItem } from 'components/ListItem'
import { SavePresetModal } from 'components/SavePreset'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes/rootStackParamList'
import { MEASURES } from 'screens/settings/data'
import { useAppSelector } from 'store/hooks'
import {
  selectCurrentPreset,
  selectTimer,
  selectTotalDurationLabel,
} from 'store/selectors'
import { SettingsKeys } from 'store/types'
import { Colors, Font } from 'theme'
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
  const durationLabel = useAppSelector(selectTotalDurationLabel)
  const currentPreset = useAppSelector(selectCurrentPreset)
  const [saveModalVisible, setSaveModalVisible] = useState(false)

  const getValue = (stateKey?: SettingsKeys) => {
    if (stateKey && stateData[stateKey]) {
      const data = stateData[stateKey]
      switch (stateKey) {
        case 'numCycles': {
          return data > 0
            ? `${String(data)} ${data === 1 ? 'cycle' : 'cycles'}`
            : ''
        }
        case 'numIntervals': {
          return data > 0
            ? `${String(data)} ${data === 1 ? 'interval' : 'intervals'}`
            : ''
        }
        default: {
          return getTimeDurationLabel(data)
        }
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
        <TouchableHighlight onPress={() => navigation.navigate('Customize')}>
          <ListItem title="Custom exercise names" icon="🛠" />
        </TouchableHighlight>
        <View style={styles.duration}>
          <Text style={styles.durationText}>
            Total duration: {durationLabel}
          </Text>
        </View>

        <Text style={styles.header}>Presets</Text>

        <TouchableHighlight onPress={() => navigation.navigate('Load')}>
          <ListItem
            title="Load"
            value="Load settings from a Preset"
            icon="👈"
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setSaveModalVisible(true)}>
          <ListItem
            title="Save"
            value="Save current setting as a Preset"
            icon="💾"
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate('Edit Presets')}>
          <ListItem title="Edit Presets" icon="✏️" />
        </TouchableHighlight>

        {currentPreset && (
          <View style={styles.duration}>
            <Text style={styles.durationText}>
              Current Preset: {currentPreset}
            </Text>
          </View>
        )}

        <SavePresetModal
          visible={saveModalVisible}
          onClose={() => setSaveModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
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
