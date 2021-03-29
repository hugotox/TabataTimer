import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
}

export type AppStateKeys = keyof AppState

const initialState: AppState = {
  initialCountdown: 3,
  warmup: 120,
  exercise: 30,
  rest: 10,
  numSets: 10,
  recovery: 50,
  numCycles: 1,
  coolDownInterval: 60,
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
  },
})
