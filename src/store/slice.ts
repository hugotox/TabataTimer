import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TimeObject } from 'components/TimeInput'

interface AppState {
  initialCountdown: TimeObject
  // warmup: TimeObject
  // exercise: TimeObject
  // rest: TimeObject
  // numSets: number
  // recovery: TimeObject
  // numCycles: number
  // coolDownInterval: TimeObject
}

const initialState: AppState = {
  initialCountdown: { minutes: 0, seconds: 3 },
  // warmup: TimeObject
  // exercise: TimeObject
  // rest: TimeObject
  // numSets: number
  // recovery: TimeObject
  // numCycles: number
  // coolDownInterval: TimeObject
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setInitialCountdown: (state, action: PayloadAction<TimeObject>) => {
      state.initialCountdown = action.payload
    },
  },
})
