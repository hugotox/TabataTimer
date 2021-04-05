import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const SaveButton = () => {
  return (
    <View style={styles.button}>
      <Text style={styles.icon}>✅</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  icon: {
    fontSize: 18,
  },
})
