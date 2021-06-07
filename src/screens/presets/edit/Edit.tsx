import { StackNavigationProp } from '@react-navigation/stack'
import { EditItem } from 'components/ListItem'
import { SavePresetModal } from 'components/SavePreset'
import React, { useCallback, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes'
import { deletePreset } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectCustomPresets } from 'store/selectors'
import { Colors } from 'themeConstants'

export type EditNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Edit Presets'
>

interface EditProps {
  navigation: EditNavigationProp
}

export const Edit = ({ navigation }: EditProps) => {
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const dispatch = useAppDispatch()
  const customPresets = useAppSelector(selectCustomPresets)
  const currentName =
    customPresets.length > 0 && selectedIndex > -1
      ? customPresets[selectedIndex].name
      : undefined
  const currentDescription =
    customPresets.length > 0 && selectedIndex > -1
      ? customPresets[selectedIndex].description
      : undefined

  const handleEditItem = useCallback((index: number) => {
    setSelectedIndex(index)
    setEditModalVisible(true)
  }, [])

  const handleDeleteItem = useCallback(
    (index: number) => {
      Alert.alert(
        'Confirm delete preset',
        `Delete preset ${customPresets[index].name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Ok', onPress: () => dispatch(deletePreset(index)) },
        ]
      )
    },
    [customPresets, dispatch]
  )

  const handleOnClose = useCallback(() => {
    setEditModalVisible(false)
  }, [])

  return (
    <>
      <ScrollView style={styles.container}>
        {customPresets.map((preset, i) => (
          <EditItem
            key={i}
            onPress={() => handleEditItem(i)}
            onDelete={() => handleDeleteItem(i)}
            title={preset.name}
            value={preset.description}
          />
        ))}
      </ScrollView>
      <SavePresetModal
        editMode
        visible={editModalVisible}
        onClose={handleOnClose}
        currentDescription={currentDescription}
        currentName={currentName}
        currentIndex={selectedIndex}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
})
