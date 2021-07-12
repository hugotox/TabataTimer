import { Audio } from 'expo-av'

const beep = require('assets/sounds/beep.mp3')
const bell = require('assets/sounds/bell.mp3')
const start = require('assets/sounds/start.mp3')

let beepSound: Audio.Sound | undefined
let bellSound: Audio.Sound | undefined
let startSound: Audio.Sound | undefined

export const loadSounds = () => {
  return Promise.all([
    Audio.Sound.createAsync(beep),
    Audio.Sound.createAsync(bell),
    Audio.Sound.createAsync(start),
  ]).then((sounds) => {
    beepSound = sounds[0].sound
    bellSound = sounds[1].sound
    startSound = sounds[2].sound
    return {
      beepSound,
      bellSound,
      startSound,
    }
  })
}

export const unLoadSounds = () => {
  return Promise.all([
    beepSound?.unloadAsync(),
    bellSound?.unloadAsync(),
    startSound?.unloadAsync(),
  ]).then(() => {
    beepSound = undefined
    bellSound = undefined
    startSound = undefined
  })
}
