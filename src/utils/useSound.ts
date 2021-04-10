import { Audio } from 'expo-av'
import { useEffect, useState } from 'react'

const beep = require('assets/sounds/beep.mp3')
const bell = require('assets/sounds/bell.mp3')
const start = require('assets/sounds/start.mp3')

export type Sounds = 'beep' | 'bell' | 'start'

export const useSound = (name: Sounds) => {
  const [sound, setSound] = useState<Audio.Sound>()

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return async () => {
    let source
    if (name === 'beep') {
      source = beep
    } else if (name === 'bell') {
      source = bell
    } else if (name === 'start') {
      source = start
    }

    const { sound } = await Audio.Sound.createAsync(source)
    setSound(sound)

    await sound.playAsync()
  }
}
