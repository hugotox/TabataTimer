import { StackNavigationProp } from '@react-navigation/stack'
import { ListItem } from 'components/ListItem'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes'
import { loadPreset } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { PresetState } from 'store/presetsSlice'
import { selectPresets } from 'store/selectors'
import { Colors } from 'themeConstants'

export type LoadNavigationProp = StackNavigationProp<RootStackParamList, 'Load'>
// export type LoadRouteProp = RouteProp<RootStackParamList, 'Load'>

interface LoadProps {
  navigation: LoadNavigationProp
}

export const Load = ({ navigation }: LoadProps) => {
  const dispatch = useAppDispatch()
  const presets = useAppSelector(selectPresets)

  const handlePress = (preset: PresetState) => {
    dispatch(loadPreset(preset.measures))
    navigation.goBack()
  }

  return (
    <ScrollView style={styles.container}>
      {presets.map((preset, i) => (
        <TouchableHighlight key={i} onPress={() => handlePress(preset)}>
          <ListItem title={preset.name} value={preset.description} />
        </TouchableHighlight>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
})
