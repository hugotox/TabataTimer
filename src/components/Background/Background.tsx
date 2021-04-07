import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

export const Background = () => {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.3)']}
      style={style.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 0 }}
    />
  )
}

const style = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    minHeight: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
})
