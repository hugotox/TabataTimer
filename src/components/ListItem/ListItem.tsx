import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { Colors } from 'themeConstants'

import { styles } from './styles'

interface ListItemProps {
  icon?: string
  title: string
  value?: string
}

export const ListItem = ({ icon, title, value }: ListItemProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.iconText}>
        {!!icon && <Text style={styles.icon}>{icon}</Text>}
        <View>
          <Text style={styles.text}>{title}</Text>
          {value ? <Text style={styles.textSmall}>{value}</Text> : null}
        </View>
      </View>
      <Entypo name="chevron-small-right" size={24} color={Colors.textDefault} />
    </View>
  )
}
