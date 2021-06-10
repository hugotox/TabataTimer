import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { restoreDefault } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectPresetsData } from 'store/selectors'

export const RestorePresetsButton = () => {
  const presets = useAppSelector(selectPresetsData)
  const dispatch = useAppDispatch()
  const handleRestore = useCallback(() => {
    dispatch(restoreDefault())
  }, [dispatch])
  if (presets.length) {
    return null
  }
  return (
    <TouchableOpacity style={styles.button} onPress={handleRestore}>
      <Text style={styles.text}>Restore{'\n'}presets</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
})
