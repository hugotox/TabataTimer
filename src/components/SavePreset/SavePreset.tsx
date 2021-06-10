import React, { useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { editPreset, savePreset } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectExercise,
  selectNumCycles,
  selectNumIntervals,
  selectRecovery,
  selectRest,
} from 'store/selectors'
import { formStyles as styles } from 'theme/formStyles'

interface Props {
  editMode?: boolean
  currentDescription?: string
  currentName?: string
  currentIndex?: number
  onClose: () => void
}

export const SavePreset = ({
  editMode,
  currentDescription,
  currentIndex,
  currentName,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch()
  const exercise = useAppSelector(selectExercise)
  const rest = useAppSelector(selectRest)
  const recovery = useAppSelector(selectRecovery)
  const numIntervals = useAppSelector(selectNumIntervals)
  const numCycles = useAppSelector(selectNumCycles)

  const [name, setName] = useState(currentName ?? '')
  const [description, setDescription] = useState(currentDescription ?? '')

  const handleOnSave = useCallback(() => {
    dispatch(
      savePreset({
        name,
        description,
        measures: {
          exercise,
          rest,
          recovery,
          numIntervals,
          numCycles,
        },
      })
    )
    onClose()
  }, [
    description,
    dispatch,
    exercise,
    name,
    numCycles,
    numIntervals,
    onClose,
    recovery,
    rest,
  ])

  const handleOnEdit = useCallback(() => {
    if (typeof currentIndex !== 'undefined') {
      dispatch(
        editPreset({
          name,
          description,
          index: currentIndex,
        })
      )
      onClose()
    }
  }, [currentIndex, description, dispatch, name, onClose])

  const handleChangeName = useCallback((text) => {
    setName(text)
  }, [])

  const handleChangeDescription = useCallback((text) => {
    setDescription(text)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {editMode ? 'Edit Preset' : 'Save Preset'}
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={handleChangeName}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={handleChangeDescription}
      />
      <View style={styles.buttons}>
        <TouchableHighlight onPress={onClose}>
          <Text style={styles.button}>Cancel</Text>
        </TouchableHighlight>
        <View style={styles.buttonSep} />
        <TouchableHighlight onPress={editMode ? handleOnEdit : handleOnSave}>
          <Text style={styles.button}>Save</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}
