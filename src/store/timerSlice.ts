import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ControlStates = 'stopped' | 'paused' | 'playing'

export type WorkoutStates =
  | 'initialCountdown'
  | 'warmup'
  | 'exercise'
  | 'rest'
  | 'recovery'
  | 'cooldownInterval'

// all times are in seconds
export interface TimerState {
  // "playing" states:
  initialCountdown: number
  warmup: number
  exercise: number
  rest: number
  recovery: number
  cooldownInterval: number

  // intervals settings
  numIntervals: number // 1 interval = exercise + rest
  numReps: number

  // control
  currentState: ControlStates
}

export type SettingsKeys = WorkoutStates | 'numReps' | 'numIntervals'

const initialState: TimerState = {
  initialCountdown: 3,
  warmup: 120,
  exercise: 30,
  rest: 10,
  recovery: 50,
  cooldownInterval: 60,
  numIntervals: 10,
  numReps: 1,
  currentState: 'stopped',
}

interface UpdatePayload {
  stateKey: SettingsKeys
  value: number
}

export interface LoadPresetPayload {
  exercise: number
  rest: number
  recovery: number
  numIntervals: number
  numReps: number
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
    loadPreset: (state, action: PayloadAction<LoadPresetPayload>) => {
      const { exercise, rest, recovery, numIntervals, numReps } = action.payload
      state.initialCountdown = 7
      state.warmup = 0
      state.exercise = exercise
      state.rest = rest
      state.recovery = recovery
      state.numIntervals = numIntervals
      state.numReps = numReps
      state.cooldownInterval = 0
    },
  },
})
