import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import { SectionList, StyleSheet, Text, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { Section, SECTIONS } from 'screens/settings/data'
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

  const handleOnPress = useCallback((section: Section, index: number) => {
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
