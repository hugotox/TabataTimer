import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SectionList, StyleSheet, Text, View } from 'react-native'

import { Item } from './Item'

const SECTIONS = [
  {
    title: 'Measures',
    data: [
      '⏱ Initial Countdown',
      '🌤 Warmup Interval',
      '🏋️ Exercise Interval',
      '😴 Rest Interval',
      '#️⃣ Number of Sets',
      '⛑ Recovery Interval',
      '♺ Number of Cycles',
      '⏱ Countdown Interval'
    ]
  },
  {
    title: 'Presets',
    data: ['👉 Load', '💾 Save', '↕ Arrange']
  }
]

export const Settings = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={SECTIONS}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 16
  },
  header: {
    fontSize: 22,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingTop: 15
  }
})
