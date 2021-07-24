import { StackNavigationProp } from '@react-navigation/stack'
import { ListItem } from 'components/ListItem'
import React, { useCallback } from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes'
import { loadPreset } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectPresetsData } from 'store/selectors'
import { Preset } from 'store/types'
import { Colors } from 'theme'

export type LoadNavigationProp = StackNavigationProp<RootStackParamList, 'Load'>

interface LoadProps {
  navigation: LoadNavigationProp
}

export const Load = ({ navigation }: LoadProps) => {
  const dispatch = useAppDispatch()
  const presets = useAppSelector(selectPresetsData)

  const handleLoadPreset = useCallback(
    (preset: Preset) => {
      dispatch(loadPreset(preset))
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
