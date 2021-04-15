import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Font } from 'themeConstants'

interface ListItemProps {
  icon: string
  title: string
  value?: string
}

export const ListItem = ({ icon, title, value }: ListItemProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.iconText}>
        <Text style={styles.icon}>{icon}</Text>
        <View>
          <Text style={styles.text}>{title}</Text>
          {value ? <Text style={styles.textSmall}>{value}</Text> : null}
        </View>
      </View>
      <Entypo name="chevron-small-right" size={24} color={Colors.textDefault} />
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
    borderBottomColor: Colors.separator,
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
  },
  textSmall: {
    fontSize: 12,
    marginTop: 2,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
  },
})
