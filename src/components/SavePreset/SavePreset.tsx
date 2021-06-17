import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Platform,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { editPreset, savePreset } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectCustomNames,
  selectExercise,
  selectNumCycles,
  selectNumIntervals,
  selectRecovery,
  selectRest,
} from 'store/selectors'
import { formStyles as styles } from 'theme/formStyles'
import { usePrevious } from 'utils'

interface Props {
  editMode?: boolean
  currentDescription?: string
  currentName?: string
  currentIndex?: number
  onClose: () => void
  visible?: boolean
}

export const SavePreset = ({
  editMode,
  currentDescription,
  currentIndex,
  currentName,
  onClose,
  visible,
}: Props) => {
  const dispatch = useAppDispatch()
  const exercise = useAppSelector(selectExercise)
  const rest = useAppSelector(selectRest)
  const recovery = useAppSelector(selectRecovery)
  const numIntervals = useAppSelector(selectNumIntervals)
  const numCycles = useAppSelector(selectNumCycles)
  const customNames = useAppSelector(selectCustomNames)

  const wasVisible = usePrevious(visible)
  const inputRef = useRef<TextInput>(null)

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
        customNames,
      })
    )
    onClose()
  }, [
    customNames,
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

  useEffect(() => {
    if (!wasVisible && visible === true) {
      inputRef.current?.focus()
    }
  }, [visible, wasVisible])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          {editMode ? 'Edit Preset' : 'Save Preset'}
        </Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handleChangeName}
          ref={inputRef}
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
    </KeyboardAvoidingView>
  )
}
