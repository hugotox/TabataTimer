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
export interface AppState {
  // "playing" states:
  initialCountdown: number
  warmup: number
  exercise: number
  rest: number
  recovery: number
  cooldownInterval: number

  // reps settings
  numReps: number // 1 rep = exercise + rest
  numSets: number

  // control
  currentState: ControlStates
  currentRep: number
  currentSet: number
}

export type SettingsKeys = WorkoutStates | 'numSets' | 'numReps'

const initialState: AppState = {
  initialCountdown: 3,
  warmup: 120,
  exercise: 30,
  rest: 10,
  recovery: 50,
  cooldownInterval: 60,
  numReps: 10,
  numSets: 1,
  currentState: 'stopped',
  currentRep: 1,
  currentSet: 1,
}

interface UpdatePayload {
  stateKey: SettingsKeys
  value: number
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
  },
})
