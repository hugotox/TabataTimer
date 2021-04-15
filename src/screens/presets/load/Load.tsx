import { ListItem } from 'components/ListItem'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { loadPreset } from 'store/actions'
import { useAppDispatch } from 'store/hooks'
import { tabata } from 'store/workouts'
import { Colors } from 'themeConstants'

export const Load = () => {
  const dispatch = useAppDispatch()

  const loadTabata = () => {
    dispatch(loadPreset(tabata))
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableHighlight onPress={loadTabata}>
        <ListItem
          icon="💪"
          title="Tabata (20 min)"
          value="5 cycles, 4 minutes each"
        />
      </TouchableHighlight>
      <ListItem
        icon="💪"
        title="HIIT (40 min)"
        value="4 cycles, 10 minutes each"
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
})
