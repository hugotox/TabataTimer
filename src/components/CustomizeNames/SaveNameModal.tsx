import { FontAwesome } from '@expo/vector-icons'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Modal,
  ModalProps,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { saveCustomName } from 'store/actions'
import { useAppDispatch } from 'store/hooks'
import { formStyles as styles } from 'theme/formStyles'
import { usePrevious } from 'utils'

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
  const { visible } = rest
  const wasVisible = usePrevious(visible)
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()
  const inputRef = useRef<TextInput>(null)

  const handleOnChange = useCallback((text: string) => {
    setName(text)
  }, [])

  const handleOnSave = useCallback(() => {
    dispatch(saveCustomName({ interval: selectedInterval, name }))
    onClose()
  }, [dispatch, name, onClose, selectedInterval])

  const handleClearInput = useCallback(() => {
    setName('')
  }, [])

  useEffect(() => {
    setName(initialName)
  }, [initialName])

  useEffect(() => {
    if (!wasVisible && visible === true) {
      inputRef.current?.focus()
    }
  }, [visible, wasVisible])

  return (
    <Modal onRequestClose={onClose} animationType="slide" {...rest}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>
            Name for interval #{selectedInterval}
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={handleOnChange}
              ref={inputRef}
            />
            {name ? (
              <TouchableOpacity
                onPress={handleClearInput}
                style={styles.clearInputBtn}
              >
                <FontAwesome name="times-circle" size={24} color="#161616" />
              </TouchableOpacity>
            ) : null}
          </View>
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
      </KeyboardAvoidingView>
    </Modal>
  )
}
