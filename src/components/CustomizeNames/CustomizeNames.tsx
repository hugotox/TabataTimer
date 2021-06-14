import { SaveNameModal } from 'components/CustomizeNames/SaveNameModal'
import { ListItem } from 'components/ListItem'
import React, { useState } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { useAppSelector } from 'store/hooks'
import { selectCustomNames, selectNumIntervals } from 'store/selectors'
import { Colors } from 'theme'

export const CustomizeNames = () => {
  const numIntervals = useAppSelector(selectNumIntervals)
  const customNames = useAppSelector(selectCustomNames)
  const [selectedInterval, setSelectedInterval] = useState(-1)
  const [saveNameVisible, setSaveNameVisible] = useState(false)
  // const dispatch = useAppDispatch()

  const intervalElements = [...Array(numIntervals)].map((_, i) => {
    return {
      interval: i + 1,
      name: customNames[i + 1] ? customNames[i + 1] : 'exercise',
    }
  })

  const handleItemClick = (interval: number) => {
    setSelectedInterval(interval)
    setSaveNameVisible(true)
  }

  const renderItem = ({
    item,
  }: {
    item: { interval: number; name: string }
  }) => {
    const { interval, name } = item
    return (
      <TouchableHighlight onPress={() => handleItemClick(interval)}>
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

  return (
    <View style={styles.container}>
      <FlatList<{ interval: number; name: string }>
        data={intervalElements}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.interval)}
      />
      <SaveNameModal
        selectedInterval={selectedInterval}
        visible={saveNameVisible}
        onClose={() => setSaveNameVisible(false)}
        initialName={customNames[selectedInterval]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
})
