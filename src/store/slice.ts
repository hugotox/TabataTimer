import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TimeObject } from 'components/TimeInput'

export interface AppState {
  initialCountdown: TimeObject
  warmup: TimeObject
  exercise: TimeObject
  rest: TimeObject
  numSets: number
  recovery: TimeObject
  numCycles: number
  coolDownInterval: TimeObject
}

export type TimeObjectKeys =
  | 'initialCountdown'
  | 'warmup'
  | 'exercise'
  | 'rest'
  | 'recovery'
  | 'coolDownInterval'

export type NumberKeys = 'numSets' | 'numCycles'

const initialState: AppState = {
  initialCountdown: { minutes: 0, seconds: 3 },
  warmup: { minutes: 2, seconds: 0 },
  exercise: { minutes: 0, seconds: 30 },
  rest: { minutes: 0, seconds: 10 },
  numSets: 10,
  recovery: { minutes: 0, seconds: 50 },
  numCycles: 1,
  coolDownInterval: { minutes: 0, seconds: 50 },
}

interface UpdatePayload {
  stateKey: keyof AppState
  value: any
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
