import { ListItem } from 'components/ListItem'
import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
// import { saveCustomName } from 'store/actions'
import { useAppSelector } from 'store/hooks'
import { selectCustomNames, selectNumIntervals } from 'store/selectors'
import { Colors } from 'themeConstants'

const renderItem = ({ item }: { item: { interval: number; name: string } }) => {
  const { interval, name } = item
  return (
    <TouchableHighlight onPress={() => {}}>
      <ListItem
        title={`Interval ${interval}: ${
          name === 'exercise' ? ' exercise' : ''
        }`}
        emphasis={name !== 'exercise' ? name : undefined}
        inlineText
      />
    </TouchableHighlight>
  )
}

export const CustomizeNames = () => {
  const numIntervals = useAppSelector(selectNumIntervals)
  const customNames = useAppSelector(selectCustomNames)
  // const dispatch = useAppDispatch()
  const intervalElements = [...Array(numIntervals)].map((_, i) => {
    return {
      interval: i + 1,
      name: customNames[i + 1] ? customNames[i + 1] : 'exercise',
    }
  })

  return (
    <FlatList<{ interval: number; name: string }>
      style={styles.container}
      data={intervalElements}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.interval)}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
})
