import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

interface ItemProps {
  title: string
}

export const Item = ({ title }: ItemProps) => (
  <TouchableHighlight>
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Entypo name="chevron-small-right" size={24} color="black" />
    </View>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  item: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  title: {
    fontSize: 18
  }
})
