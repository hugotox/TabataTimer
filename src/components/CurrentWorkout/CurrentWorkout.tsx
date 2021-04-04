import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface Props {
  label: string
}

export const CurrentWorkout = ({ label }: Props) => {
  return <Text style={style.text}>{label}</Text>
}

const style = StyleSheet.create({
  text: {
    fontWeight: '200',
    color: '#ddd',
    fontSize: 45,
    alignSelf: 'flex-end',
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
})
