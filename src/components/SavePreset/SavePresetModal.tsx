import { SavePreset } from 'components/SavePreset/SavePreset'
import React from 'react'
import { Modal, ModalProps } from 'react-native'

interface Props extends ModalProps {
  onClose: () => void
}

export const SavePresetModal = ({ onClose, ...rest }: Props) => {
  return (
    <Modal onRequestClose={onClose} animationType="slide" {...rest}>
      <SavePreset onClose={onClose} />
    </Modal>
  )
}
