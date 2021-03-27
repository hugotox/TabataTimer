import { RootState } from 'store/store'

export const selectInitialCountdown = (state: RootState) =>
  state.initialCountdown

export const selectWarmup = (state: RootState) => state.warmup

export const selectExercise = (state: RootState) => state.exercise

export const selectRest = (state: RootState) => state.rest

export const selectNumSets = (state: RootState) => state.numSets

export const selectRecovery = (state: RootState) => state.recovery

export const selectNumCycles = (state: RootState) => state.numCycles

export const selectCoolDownInterval = (state: RootState) =>
  state.coolDownInterval
