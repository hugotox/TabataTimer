import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { savePreset } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectExercise,
  selectNumCycles,
  selectNumRounds,
  selectRecovery,
  selectRest,
} from 'store/selectors'
import { Colors, Font } from 'themeConstants'

interface Props {
  onClose: () => void
}

export const SavePreset = ({ onClose }: Props) => {
  const dispatch = useAppDispatch()
  const exercise = useAppSelector(selectExercise)
  const rest = useAppSelector(selectRest)
  const recovery = useAppSelector(selectRecovery)
  const numRounds = useAppSelector(selectNumRounds)
  const numCycles = useAppSelector(selectNumCycles)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleOnSave = () => {
    dispatch(
      savePreset({
        name,
        description,
        measures: {
          exercise,
          rest,
          recovery,
          numRounds,
          numCycles,
        },
      })
    )
    onClose()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Save Preset</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={styles.buttons}>
        <TouchableHighlight onPress={onClose}>
          <Text style={styles.button}>Cancel</Text>
        </TouchableHighlight>
        <View style={styles.buttonSep} />
        <TouchableHighlight onPress={handleOnSave}>
          <Text style={styles.button}>Save</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
    marginBottom: 50,
  },
  label: {
    fontSize: 16,
    lineHeight: 19,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
    marginBottom: 10,
  },
  input: {
    color: '#ccc',
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 60,
  },
  button: {
    color: Colors.background,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: Font.weightBold,
    backgroundColor: Colors.textOrange,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  buttonSep: {
    width: 20,
  },
})
