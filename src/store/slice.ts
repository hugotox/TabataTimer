import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ControlStates = 'stopped' | 'paused' | 'completed'

export type WorkoutStates =
  | 'initialCountdown'
  | 'warmup'
  | 'exercise'
  | 'rest'
  | 'recovery'
  | 'coolDownInterval'

// all times are in seconds
export interface AppState {
  initialCountdown: number
  warmup: number
  exercise: number
  rest: number
  numSets: number
  recovery: number
  numCycles: number
  coolDownInterval: number
  currentState: ControlStates | WorkoutStates
  pauseState?: ControlStates | WorkoutStates
}

export type AppStateKeys = WorkoutStates | 'numSets' | 'numCycles'

const initialState: AppState = {
  initialCountdown: 3,
  warmup: 120,
  exercise: 30,
  rest: 10,
  numSets: 10,
  recovery: 50,
  numCycles: 1,
  coolDownInterval: 60,
  currentState: 'stopped',
}

interface UpdatePayload {
  stateKey: AppStateKeys
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
      if (state.currentState === 'paused' && state.pauseState) {
        state.currentState = state.pauseState
        state.pauseState = undefined
      } else if (state.initialCountdown) {
        state.currentState = 'initialCountdown'
      } else if (state.warmup) {
        state.currentState = 'warmup'
      } else {
        state.currentState = 'exercise'
      }
    },
    pause: (state) => {
      state.pauseState = state.currentState
      state.currentState = 'paused'
    },
    stop: (state) => {
      state.pauseState = undefined
      state.currentState = 'stopped'
    },
  },
})
