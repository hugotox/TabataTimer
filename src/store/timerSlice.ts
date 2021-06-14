import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CustomExercisePayload,
  Preset,
  TimerState,
  UpdatePayload,
} from 'store/types'

const initialState: TimerState = {
  initialCountdown: 3,
  warmup: 120,
  exercise: 30,
  rest: 10,
  recovery: 50,
  cooldownInterval: 60,
  numIntervals: 10,
  numCycles: 1,
  currentState: 'stopped',
  currentPreset: undefined,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<UpdatePayload>) => {
      const { stateKey, value } = action.payload
      state[stateKey] = value
    },
    start: (state) => {
      state.currentState = 'playing'
    },
    pause: (state) => {
      state.currentState = 'paused'
    },
    stop: (state) => {
      state.currentState = 'stopped'
    },
    loadPreset: (state, action: PayloadAction<Preset>) => {
      const { measures, name, customNames } = action.payload
      const { exercise, rest, recovery, numIntervals, numCycles } = measures
      state.initialCountdown = 7
      state.warmup = 0
      state.exercise = exercise
      state.rest = rest
      state.recovery = recovery
      state.numIntervals = numIntervals
      state.numCycles = numCycles
      state.cooldownInterval = 0
      state.currentPreset = name
      state.customNames = customNames
    },
    saveCustomName: (state, action: PayloadAction<CustomExercisePayload>) => {
      const { interval, name } = action.payload
      if (!state.customNames) {
        state.customNames = {}
      }
      state.customNames[interval] = name
    },
  },
})
