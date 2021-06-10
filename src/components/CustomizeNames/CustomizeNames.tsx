import { SaveNameModal } from 'components/CustomizeNames/SaveNameModal'
import { ListItem } from 'components/ListItem'
import React, { useState } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
// import { saveCustomName } from 'store/actions'
import { useAppSelector } from 'store/hooks'
import {
  selectCurrentPreset,
  selectCustomNames,
  selectNumIntervals,
  selectPresetsData,
} from 'store/selectors'
import { Colors } from 'theme'

export const CustomizeNames = () => {
  const numIntervals = useAppSelector(selectNumIntervals)
  const customNames = useAppSelector(selectCustomNames)
  const presets = useAppSelector(selectPresetsData)
  const currentPreset = useAppSelector(selectCurrentPreset)
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

  const selectedPreset = presets.find((preset) => preset.name === currentPreset)

  return (
    <View style={styles.container}>
      {selectedPreset?.name ? (
        <ListItem
          title="Preset: "
          emphasis={selectedPreset?.name}
          inlineText
          iconRight={false}
        />
      ) : (
        <ListItem title="Select Preset" />
      )}
      <FlatList<{ interval: number; name: string }>
        data={intervalElements}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.interval)}
      />
      <SaveNameModal
        selectedInterval={selectedInterval}
        selectedPreset={selectedPreset}
        visible={saveNameVisible}
        onClose={() => setSaveNameVisible(false)}
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
