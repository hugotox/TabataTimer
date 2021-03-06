import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { Colors } from 'theme'

import { styles } from './styles'

interface ListItemProps {
  icon?: string
  title: string
  value?: string
  emphasis?: string
  inlineText?: boolean
  iconRight?: boolean
}

export const ListItem = ({
  icon,
  inlineText,
  title,
  value,
  emphasis,
  iconRight = true,
}: ListItemProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.iconText}>
        {!!icon && <Text style={styles.icon}>{icon}</Text>}
        <View style={[inlineText && styles.inlineText]}>
          <Text style={styles.text}>{title}</Text>
          {emphasis ? (
            <Text style={styles.textEmphasis}> {emphasis} </Text>
          ) : null}
          {value ? <Text style={styles.textSmall}>{value}</Text> : null}
        </View>
      </View>
      {iconRight && (
        <Entypo
          name="chevron-small-right"
          size={24}
          color={Colors.textDefault}
        />
      )}
    </View>
  )
}
