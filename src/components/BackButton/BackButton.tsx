import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from 'theme'

export const BackButton = () => {
  return (
    <View style={styles.button}>
      <Ionicons
        name="chevron-back-circle-outline"
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
