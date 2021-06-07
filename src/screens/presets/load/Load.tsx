import { StackNavigationProp } from '@react-navigation/stack'
import { ListItem } from 'components/ListItem'
import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes'
import { loadPreset } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { PresetState } from 'store/presetsSlice'
import { selectCustomPresets, selectDefaultPresets } from 'store/selectors'
import { Colors } from 'themeConstants'

export type LoadNavigationProp = StackNavigationProp<RootStackParamList, 'Load'>

interface LoadProps {
  navigation: LoadNavigationProp
}

export const Load = ({ navigation }: LoadProps) => {
  const dispatch = useAppDispatch()
  const defaultPresets = useAppSelector(selectDefaultPresets)
  const customPresets = useAppSelector(selectCustomPresets)
  const presets = [...defaultPresets, ...customPresets]

  const handleLoadPreset = useCallback(
    (preset: PresetState) => {
      dispatch(loadPreset(preset.measures))
      navigation.goBack()
    },
    [dispatch, navigation]
  )

  return (
    <ScrollView style={styles.container}>
      {presets.map((preset, i) => (
        <TouchableHighlight key={i} onPress={() => handleLoadPreset(preset)}>
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
