import type { AudioPlayer } from 'expo-audio'

export const beepSource = require('assets/sounds/beep.mp3')
export const bellSource = require('assets/sounds/bell.mp3')
export const startSource = require('assets/sounds/start.mp3')

/** Restart a (possibly already playing) sound from the beginning. */
export const replay = (player: AudioPlayer) => {
  player.seekTo(0).catch(() => {})
  player.play()
}
