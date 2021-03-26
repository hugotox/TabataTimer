import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const BackButton = () => {
  return (
    <View style={styles.button}>
      <Text style={styles.icon}>⬅️</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  icon: {
    fontSize: 18,
  },
})
