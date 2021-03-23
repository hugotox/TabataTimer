import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useState } from 'react'
import { SectionList, StyleSheet, Text, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

import { Item } from './Item'

const SECTIONS = [
  {
    title: 'Measures',
    data: [
      '⏱-Initial Countdown',
      '🌤-Warmup Interval',
      '🏋️-Exercise Interval',
      '😴-Rest Interval',
      '#️⃣-Number of Sets',
      '⛑-Recovery Interval',
      '♺-Number of Cycles',
      '⏱-Countdown Interval',
    ],
  },
  {
    title: 'Presets',
    data: ['👉-Load', '💾-Save', '↕️-Arrange'],
  },
]

interface SettingsProps {
  navigation: StackNavigationProp<any>
}

export const Settings = ({ navigation }: SettingsProps) => {
  const [screenTitle, setScreenTitle] = useState('Settings')

  const handleOnPress = useCallback((section, index) => {
    navigation.navigate('Input', { section, index })
  }, [])

  return (
    <View>
      <SectionList
        keyExtractor={(item, index) => item + index}
        sections={SECTIONS}
        renderItem={({ item, index, section }) => (
          <TouchableHighlight onPress={() => handleOnPress(section, index)}>
            <Item title={item} />
          </TouchableHighlight>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    // paddingTop: 15
  },
})
