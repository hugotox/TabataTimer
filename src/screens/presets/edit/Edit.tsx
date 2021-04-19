import { StackNavigationProp } from '@react-navigation/stack'
import { EditItem } from 'components/ListItem'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectCustomPresets, selectDefaultPresets } from 'store/selectors'
import { Colors } from 'themeConstants'

export type EditNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Edit Presets'
>

interface EditProps {
  navigation: EditNavigationProp
}

export const Edit = ({ navigation }: EditProps) => {
  const dispatch = useAppDispatch()
  const defaultPresets = useAppSelector(selectDefaultPresets)
  const customPresets = useAppSelector(selectCustomPresets)
  const presets = [...defaultPresets, ...customPresets]

  // const handleLoadPreset = (preset: PresetState) => {
  //   dispatch(loadPreset(preset.measures))
  //   navigation.goBack()
  // }

  return (
    <ScrollView style={styles.container}>
      {presets.map((preset, i) => (
        <EditItem key={i} title={preset.name} value={preset.description} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
})
