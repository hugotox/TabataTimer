import { presetsSlice } from 'store/presetsSlice'
import { timerSlice } from 'store/timerSlice'

export const {
  updateValue,
  start,
  pause,
  stop,
  loadPreset,
  saveCustomName,
  clearRemainingCustomNames,
  clearAllNames,
} = timerSlice.actions

export const { editPreset, savePreset, deletePreset, restoreDefault } =
  presetsSlice.actions
