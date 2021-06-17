import { SavePreset } from 'components/SavePreset/SavePreset'
import React from 'react'
import { Modal, ModalProps } from 'react-native'

interface Props extends ModalProps {
  onClose: () => void
  editMode?: boolean
  currentDescription?: string
  currentIndex?: number
  currentName?: string
}

export const SavePresetModal = ({
  onClose,
  editMode,
  currentDescription,
  currentName,
  currentIndex,
  ...rest
}: Props) => {
  return (
    <Modal onRequestClose={onClose} animationType="slide" {...rest}>
      <SavePreset
        onClose={onClose}
        editMode={editMode}
        currentDescription={currentDescription}
        currentName={currentName}
        currentIndex={currentIndex}
        visible={rest.visible}
      />
    </Modal>
  )
}
