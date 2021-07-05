import { createSelector } from 'reselect'
import { RootState } from 'store/store'
import { WorkflowItem, TimerState } from 'store/types'
import { getTimeDurationLabel } from 'utils'

export const selectTimer = (state: RootState) => state.timer

export const selectPresets = (state: RootState) => state.presets

export const selectPresetsData = createSelector(
  selectPresets,
  (state) => state.data
)

export const selectInitialCountdown = createSelector(
  selectTimer,
  (data: TimerState) => data.initialCountdown
)

export const selectWarmup = createSelector(
  selectTimer,
  (data: TimerState) => data.warmup
)

export const selectNumCycles = createSelector(
  selectTimer,
  (data: TimerState) => data.numCycles
)

export const selectNumIntervals = createSelector(
  selectTimer,
  (data: TimerState) => data.numIntervals
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

export const selectCurrentPreset = createSelector(
  selectTimer,
  (state) => state.currentPreset
)

export const selectWorkflow = createSelector(
  [
    selectCooldown,
    selectExercise,
    selectInitialCountdown,
    selectNumIntervals,
    selectNumCycles,
    selectRecovery,
    selectRest,
    selectWarmup,
  ],
  (
    cooldownInterval,
    exercise,
    initialCountdown,
    numIntervals,
    numCycles,
    recovery,
    rest,
    warmup
  ) => {
    const workflow: WorkflowItem[] = []
    if (initialCountdown) {
      workflow.push({
        currentState: 'initialCountdown',
        duration: initialCountdown,
        currentCycle: numCycles,
        currentInterval: numIntervals,
      })
    }
    if (warmup) {
      workflow.push({
        currentState: 'warmup',
        duration: warmup,
        currentCycle: numCycles,
        currentInterval: numIntervals,
      })
    }
    for (let cycle = 1; cycle <= numCycles; cycle++) {
      for (let interval = 1; interval <= numIntervals; interval++) {
        if (exercise) {
          workflow.push({
            currentState: 'exercise',
            duration: exercise,
            currentCycle: numCycles - cycle + 1,
            currentInterval: numIntervals - interval + 1,
          })
        }
        if (rest) {
          if (interval < numIntervals) {
            workflow.push({
              currentState: 'rest',
              duration: rest,
              currentCycle: numCycles - cycle + 1,
              currentInterval: numIntervals - interval,
            })
          } else if (!recovery) {
            workflow.push({
              currentState: 'rest',
              duration: rest,
              currentCycle: numCycles - cycle + 1,
              currentInterval: numIntervals - interval,
            })
          }
        }
      }
      if (recovery) {
        workflow.push({
          currentState: 'recovery',
          duration: recovery,
          currentCycle: numCycles - cycle,
          currentInterval: numIntervals,
        })
      }
    }
    if (cooldownInterval) {
      workflow.push({
        currentState: 'cooldownInterval',
        duration: cooldownInterval,
        currentCycle: 0,
        currentInterval: 0,
      })
    }
    return workflow
  }
)

export const selectTotalDuration = createSelector(selectWorkflow, (workflow) =>
  workflow.reduce((acc, item) => acc + item.duration, 0)
)

export const selectTotalDurationLabel = createSelector(
  selectTotalDuration,
  (totalDuration) => getTimeDurationLabel(totalDuration)
)

export const selectCustomNames = createSelector(
  selectTimer,
  (data) => data.customNames ?? {}
)
