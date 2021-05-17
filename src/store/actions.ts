import { presetsSlice } from 'store/presetsSlice'
import { timerSlice } from 'store/timerSlice'

export const { updateValue, start, pause, stop, loadPreset } =
  timerSlice.actions

export const { editPreset, savePreset, deletePreset } = presetsSlice.actions
