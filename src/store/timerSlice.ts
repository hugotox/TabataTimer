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

  // rounds settings
  numRounds: number // 1 round = exercise + rest
  numCycles: number

  // control
  currentState: ControlStates
}

export type SettingsKeys = WorkoutStates | 'numCycles' | 'numRounds'

const initialState: TimerState = {
  initialCountdown: 3,
  warmup: 120,
  exercise: 30,
  rest: 10,
  recovery: 50,
  cooldownInterval: 60,
  numRounds: 10,
  numCycles: 1,
  currentState: 'stopped',
}

interface UpdatePayload {
  stateKey: SettingsKeys
  value: number
}

interface LoadPresetPayload {
  exercise: number
  rest: number
  recovery: number
  numRounds: number
  numCycles: number
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
      const { exercise, rest, recovery, numRounds, numCycles } = action.payload
      state.initialCountdown = 7
      state.warmup = 0
      state.exercise = exercise
      state.rest = rest
      state.recovery = recovery
      state.numRounds = numRounds
      state.numCycles = numCycles
      state.cooldownInterval = 0
    },
  },
})
