import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ItemProps {
  icon: string
  title: string
  value: string
}

export const Item = ({ icon, title, value }: ItemProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.iconText}>
        <Text style={styles.icon}>{icon}</Text>
        <View>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.textSmall}>{value}</Text>
        </View>
      </View>
      <Entypo name="chevron-small-right" size={24} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    width: 35,
    fontSize: 22,
    lineHeight: 24,
  },
  item: {
    paddingLeft: 0,
    paddingRight: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
  },
  textSmall: {
    fontSize: 12,
    marginTop: 2,
  },
})
