import React, { useCallback, useEffect, useState } from 'react'
import {
  Modal,
  ModalProps,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { saveCustomName } from 'store/actions'
import { useAppDispatch } from 'store/hooks'
import { formStyles as styles } from 'theme/formStyles'

interface Props extends ModalProps {
  onClose: () => void
  selectedInterval: number
  initialName: string
}

export const SaveNameModal = ({
  onClose,
  selectedInterval,
  initialName,
  ...rest
}: Props) => {
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()
  const handleOnChange = useCallback((text: string) => {
    setName(text)
  }, [])

  const handleOnSave = useCallback(() => {
    dispatch(saveCustomName({ interval: selectedInterval, name }))
    onClose()
  }, [dispatch, name, onClose, selectedInterval])

  useEffect(() => {
    setName(initialName)
  }, [initialName])

  return (
    <Modal onRequestClose={onClose} animationType="slide" {...rest}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Name for interval #{selectedInterval}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handleOnChange}
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
    </Modal>
  )
}
