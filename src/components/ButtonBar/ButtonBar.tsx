import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { ControlStates } from 'store/slice'

interface Props {
  currentState: ControlStates
  onPressPlay: () => void
  onPressSettings: () => void
  onPressStop: () => void
}

export const ButtonBar = ({
  currentState,
  onPressPlay,
  onPressSettings,
  onPressStop,
}: Props) => {
  return (
    <View style={style.buttons}>
      <View>
        <TouchableOpacity onPress={onPressPlay} activeOpacity={0.5}>
          <Ionicons
            name={
              currentState !== 'playing'
                ? 'play-circle-outline'
                : 'pause-circle-outline'
            }
            size={45}
            color={ICON_COLOR}
          />
        </TouchableOpacity>
      </View>
      <View style={style.buttonsRight}>
        {currentState === 'stopped' ? (
          <TouchableOpacity onPress={onPressSettings} activeOpacity={0.5}>
            <Ionicons name="settings-outline" size={41} color={ICON_COLOR} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPressStop} activeOpacity={0.5}>
            <Ionicons name="stop-circle-outline" size={45} color={ICON_COLOR} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const ICON_COLOR = '#d5ecff'

const style = StyleSheet.create({
  buttons: {
    backgroundColor: '#28313d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  buttonsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
