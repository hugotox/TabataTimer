import { SaveNameModal } from 'components/CustomizeNames/SaveNameModal'
import { ListItem } from 'components/ListItem'
import React, { useState } from 'react'
import { Alert, StyleSheet, FlatList, View, Text } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { clearAllNames } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectCustomNames, selectNumIntervals } from 'store/selectors'
import { Colors, Font } from 'theme'

export const CustomizeNames = () => {
  const numIntervals = useAppSelector(selectNumIntervals)
  const customNames = useAppSelector(selectCustomNames)
  const dispatch = useAppDispatch()
  const [selectedInterval, setSelectedInterval] = useState(-1)
  const [saveNameVisible, setSaveNameVisible] = useState(false)

  // +1 to add a "clear all" button at the end of the list
  const intervalElements = [...Array(numIntervals + 1)].map((_, i) => {
    return {
      interval: i + 1,
      name: customNames[i + 1] ? customNames[i + 1] : 'exercise',
    }
  })

  const handleItemClick = (interval: number) => {
    if (interval === numIntervals + 1) {
      Alert.alert('Clear all names?', '', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Ok', onPress: () => dispatch(clearAllNames()) },
      ])
    } else {
      setSelectedInterval(interval)
      setSaveNameVisible(true)
    }
  }

  const renderItem = ({
    item,
  }: {
    item: { interval: number; name: string }
  }) => {
    const { interval, name } = item
    return (
      <TouchableHighlight onPress={() => handleItemClick(interval)}>
        {interval === numIntervals + 1 ? (
          <Text style={styles.clearButton}>Clear all</Text>
        ) : (
          <ListItem
            title={`Interval ${interval}: ${
              name === 'exercise' ? ' exercise' : ''
            }`}
            emphasis={name !== 'exercise' ? name : undefined}
            inlineText
          />
        )}
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
  clearButton: {
    fontSize: 16,
    lineHeight: 19,
    color: Colors.textRed,
    fontWeight: Font.weightNormal,
    padding: 15,
    alignSelf: 'flex-end',
  },
})
