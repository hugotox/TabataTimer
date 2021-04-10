import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from 'themeConstants'

export const SaveButton = () => {
  return (
    <View style={styles.button}>
      <Ionicons
        name="checkmark-circle-outline"
        size={30}
        color={Colors.iconColor}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
  },
})
