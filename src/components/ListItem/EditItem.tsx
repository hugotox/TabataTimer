import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from 'themeConstants'

import { styles } from './styles'

interface EditItemProps {
  title: string
  value?: string
}

export const EditItem = ({ title, value }: EditItemProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.iconText}>
        <View style={editStyles.drag}>
          <MaterialIcons
            name="drag-handle"
            size={24}
            color={Colors.textOrange}
          />
        </View>
        <View>
          <Text style={styles.text}>{title}</Text>
          {value ? <Text style={styles.textSmall}>{value}</Text> : null}
        </View>
      </View>
      <MaterialIcons name="delete-outline" size={24} color="#cc0000" />
    </View>
  )
}

const editStyles = StyleSheet.create({
  drag: {
    paddingVertical: 5,
    paddingRight: 5,
  },
})
