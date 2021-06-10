import React from 'react'
import {
  Modal,
  ModalProps,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Preset } from 'store/types'
import { formStyles as styles } from 'theme/formStyles'

interface Props extends ModalProps {
  onClose: () => void
  selectedInterval: number
  selectedPreset?: Preset
}

export const SaveNameModal = ({
  onClose,
  selectedInterval,
  selectedPreset,
  ...rest
}: Props) => {
  return (
    <Modal onRequestClose={onClose} animationType="slide" {...rest}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Name for interval #{selectedInterval}</Text>
        <TextInput style={styles.input} value="" onChangeText={() => {}} />
        <View style={styles.buttons}>
          <TouchableHighlight onPress={onClose}>
            <Text style={styles.button}>Cancel</Text>
          </TouchableHighlight>
          <View style={styles.buttonSep} />
          <TouchableHighlight onPress={onClose}>
            <Text style={styles.button}>Save</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </Modal>
  )
}
