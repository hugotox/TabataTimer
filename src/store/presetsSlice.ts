import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoadPresetPayload } from 'store/timerSlice'
import { CustomExerciseName, CustomExerciseNames } from 'store/types'

export interface PresetState {
  name: string
  description: string
  measures: LoadPresetPayload
}

const defaultPresets: PresetState[] = [
  {
    name: 'Tabata',
    description: '20s work/10s rest. 20 mins total',
    measures: {
      exercise: 20,
      rest: 10,
      recovery: 0,
      numIntervals: 8,
      numReps: 5,
    },
  },
  {
    name: 'HIIT',
    description: '40s work/20s rest. 20 mins total',
    measures: {
      exercise: 40,
      rest: 20,
      recovery: 0,
      numIntervals: 5,
      numReps: 4,
    },
  },
]

const data = defaultPresets
const customNames: CustomExerciseNames = {}

export const presetsSlice = createSlice({
  name: 'presets',
  initialState: {
    data,
    customNames,
  },
  reducers: {
    savePreset: (state, action: PayloadAction<PresetState>) => {
      state.data = state.data.concat(action.payload)
    },
    editPreset: (
      state,
      action: PayloadAction<{
        index: number
        name: string
        description?: string
      }>
    ) => {
      const { index, name, description } = action.payload
      const preset = state.data[index]
      state.data[index] = {
        ...preset,
        name,
        description: description ?? '',
      }
    },
    deletePreset: (state, action: PayloadAction<number>) => {
      const index = action.payload
      const presets = state.data.slice()
      if (index >= 0 && index < state.data.length) {
        presets.splice(index, 1)
      }
      state.data = presets
    },
    restoreDefault: (state) => {
      state.data = defaultPresets
    },
    saveCustomName: (state, action: PayloadAction<CustomExerciseName>) => {
      const { interval, name } = action.payload
      if (!state.customNames) {
        state.customNames = {}
      }
      state.customNames[interval] = name
    },
  },
})
