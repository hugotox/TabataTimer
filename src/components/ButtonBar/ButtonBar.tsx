import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ControlStates } from 'store/types'
import { Colors } from 'theme'

interface Props {
  currentState: ControlStates
  onPressPlay: () => void
  onPressSettings: () => void
  onPressStop: () => void
  onPressPrevious: () => void
  onPressNext: () => void
  orientation: 'portrait' | 'landscape'
}

export const ButtonBar = ({
  currentState,
  onPressPlay,
  onPressSettings,
  onPressStop,
  onPressNext,
  onPressPrevious,
  orientation,
}: Props) => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        orientation === 'portrait' ? styles.buttons : styles.landscapeButtons,
        { paddingBottom: insets.bottom || 10 },
      ]}
    >
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
        <View
          style={
            orientation === 'portrait'
              ? styles.buttonsCenter
              : styles.landscapeCenter
          }
        >
          <TouchableOpacity
            onPress={onPressPrevious}
            activeOpacity={0.5}
            style={orientation === 'portrait' ? styles.backward : undefined}
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
      <View
        style={
          orientation === 'portrait'
            ? styles.buttonsRight
            : styles.landscapeRight
        }
      >
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

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: '#2b2a2a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  landscapeButtons: {
    backgroundColor: '#2b2a2a',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 20,
    paddingLeft: 40,
  },
  buttonsCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  landscapeCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  backward: {
    marginRight: 10,
  },
  buttonsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  landscapeRight: {
    flexDirection: 'column',
    alignItems: 'center',
  },
})
