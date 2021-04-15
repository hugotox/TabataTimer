import { createSlice } from '@reduxjs/toolkit'
import { LoadPresetPayload } from 'store/timerSlice'

export interface PresetState {
  name: string
  description: string
  measures: LoadPresetPayload
}

// default presets
export const initialState: PresetState[] = [
  {
    name: 'Tabata',
    description: '20s work/10s rest. 20 mins total',
    measures: {
      exercise: 20,
      rest: 10,
      recovery: 0,
      numRounds: 8,
      numCycles: 5,
    },
  },
  {
    name: 'HIIT',
    description: '40s work/20s rest. 20 mins total',
    measures: {
      exercise: 40,
      rest: 20,
      recovery: 0,
      numRounds: 5,
      numCycles: 4,
    },
  },
]

export const presetsSlice = createSlice({
  name: 'presets',
  initialState,
  reducers: {},
})
