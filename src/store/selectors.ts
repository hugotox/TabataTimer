import { createSelector } from 'reselect'
import { RootState } from 'store/store'
import { TimerState } from 'store/timerSlice'
import { WorkflowItem } from 'store/types'

export const selectTimer = (state: RootState) => state.timer

export const selectPresets = (state: RootState) => state.presets

export const selectInitialCountdown = createSelector(
  selectTimer,
  (data: TimerState) => data.initialCountdown
)

export const selectWarmup = createSelector(
  selectTimer,
  (data: TimerState) => data.warmup
)

export const selectNumSets = createSelector(
  selectTimer,
  (data: TimerState) => data.numSets
)

export const selectNumReps = createSelector(
  selectTimer,
  (data: TimerState) => data.numReps
)

export const selectExercise = createSelector(
  selectTimer,
  (data: TimerState) => data.exercise
)

export const selectRest = createSelector(
  selectTimer,
  (data: TimerState) => data.rest
)

export const selectRecovery = createSelector(
  selectTimer,
  (data: TimerState) => data.recovery
)

export const selectCooldown = createSelector(
  selectTimer,
  (data: TimerState) => data.cooldownInterval
)

export const selectCurrentState = createSelector(
  selectTimer,
  (data: TimerState) => data.currentState
)

export const selectWorkflow = createSelector(
  [
    selectCooldown,
    selectExercise,
    selectInitialCountdown,
    selectNumReps,
    selectNumSets,
    selectRecovery,
    selectRest,
    selectWarmup,
  ],
  (
    cooldownInterval,
    exercise,
    initialCountdown,
    numReps,
    numSets,
    recovery,
    rest,
    warmup
  ) => {
    const workflow: WorkflowItem[] = []
    if (initialCountdown) {
      workflow.push(['initialCountdown', initialCountdown])
    }
    if (warmup) {
      workflow.push(['warmup', warmup])
    }
    for (let set = 1; set <= numSets; set++) {
      for (let rep = 1; rep <= numReps; rep++) {
        if (exercise) {
          workflow.push(['exercise', exercise])
        }
        if (rest) {
          if (rep < numReps) {
            workflow.push(['rest', rest])
          } else if (!recovery) {
            workflow.push(['rest', rest])
          }
        }
      }
      if (recovery) {
        workflow.push(['recovery', recovery])
      }
    }
    if (cooldownInterval) {
      workflow.push(['cooldownInterval', cooldownInterval])
    }
    return workflow
  }
)

export const selectTotalDuration = createSelector(selectWorkflow, (workflow) =>
  workflow.reduce((acc, item) => acc + item[1], 0)
)
