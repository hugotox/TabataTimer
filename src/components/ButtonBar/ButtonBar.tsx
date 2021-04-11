import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { ControlStates } from 'store/timerSlice'
import { Colors } from 'themeConstants'

interface Props {
  currentState: ControlStates
  onPressPlay: () => void
  onPressSettings: () => void
  onPressStop: () => void
  onPressPrevious: () => void
  onPressNext: () => void
}

export const ButtonBar = ({
  currentState,
  onPressPlay,
  onPressSettings,
  onPressStop,
  onPressNext,
  onPressPrevious,
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
            color={Colors.iconColor}
          />
        </TouchableOpacity>
      </View>
      {currentState !== 'stopped' && (
        <View style={style.buttonsCenter}>
          <TouchableOpacity
            onPress={onPressPrevious}
            activeOpacity={0.5}
            style={style.backward}
          >
            <Ionicons
              name="play-back-circle-outline"
              size={45}
              color={Colors.iconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressNext} activeOpacity={0.5}>
            <Ionicons
              name="play-forward-circle-outline"
              size={45}
              color={Colors.iconColor}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={style.buttonsRight}>
        {currentState === 'stopped' ? (
          <TouchableOpacity onPress={onPressSettings} activeOpacity={0.5}>
            <Ionicons
              name="settings-outline"
              size={41}
              color={Colors.iconColor}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPressStop} activeOpacity={0.5}>
            <Ionicons
              name="stop-circle-outline"
              size={45}
              color={Colors.iconColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  buttons: {
    backgroundColor: '#2b2a2a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  buttonsCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backward: {
    marginRight: 10,
  },
  buttonsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
