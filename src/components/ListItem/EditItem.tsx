import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { useDimensions } from 'utils'

import { styles } from './styles'

interface EditItemProps {
  title: string
  value?: string
  onPress: () => void
}

export const EditItem = ({ title, value, onPress }: EditItemProps) => {
  const { width } = useDimensions()
  return (
    <View style={styles.item}>
      <View style={styles.iconText}>
        <TouchableHighlight onPress={onPress} style={{ width: width - 70 }}>
          <View>
            <Text style={styles.text}>{title}</Text>
            {value ? <Text style={styles.textSmall}>{value}</Text> : null}
          </View>
        </TouchableHighlight>
      </View>
      <TouchableHighlight style={editStyles.icon}>
        <MaterialIcons name="delete-outline" size={24} color="#cc0000" />
      </TouchableHighlight>
    </View>
  )
}

const editStyles = StyleSheet.create({
  icon: {
    width: 30,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
