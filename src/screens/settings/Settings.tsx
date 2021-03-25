import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { SECTIONS, MEASURES, PRESETS, ItemType } from 'screens/settings/data'
import { RootStackParamList } from 'utils/navigation'

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
  // const [screenTitle, setScreenTitle] = useState('Settings')

  const handleOnPress = useCallback((section: string, item: ItemType) => {
    navigation.navigate('Input', { section, item })
  }, [])

  return (
    <View>
      <StatusBar style="auto" />
      {/* <SectionList
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
      /> */}
      <ScrollView>
        <Text style={styles.header}>Measures</Text>
        {MEASURES.items.map((item, i) => (
          <TouchableHighlight
            onPress={() => handleOnPress(SECTIONS.measures, item)}
          >
            <Item key={i} title={item.label} icon={item.icon} />
          </TouchableHighlight>
        ))}
        <Text style={styles.header}>Presets</Text>
        {PRESETS.items.map((item, i) => (
          <TouchableHighlight
            onPress={() => handleOnPress(SECTIONS.presets, item)}
          >
            <Item key={i} title={item.label} icon={item.icon} />
          </TouchableHighlight>
        ))}
      </ScrollView>
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
