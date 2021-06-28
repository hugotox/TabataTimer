import { Audio } from 'expo-av'
import { useCallback, useEffect } from 'react'

const beep = require('assets/sounds/beep.mp3')
const bell = require('assets/sounds/bell.mp3')
const start = require('assets/sounds/start.mp3')

let beepSound: Audio.Sound | undefined
let bellSound: Audio.Sound | undefined
let startSound: Audio.Sound | undefined

export const useSounds = (isActive: boolean) => {
  const loadSounds = useCallback(async () => {
    beepSound = (await Audio.Sound.createAsync(beep)).sound
    bellSound = (await Audio.Sound.createAsync(bell)).sound
    startSound = (await Audio.Sound.createAsync(start)).sound
  }, [])

  const unLoadSounds = useCallback(() => {
    beepSound?.unloadAsync()
    bellSound?.unloadAsync()
    startSound?.unloadAsync()
  }, [])

  useEffect(() => {
    if (isActive) {
      loadSounds()
    } else {
      unLoadSounds()
      beepSound = undefined
      bellSound = undefined
      startSound = undefined
    }
  }, [isActive, loadSounds, unLoadSounds])

  return {
    beepSound,
    bellSound,
    startSound,
  }
}
