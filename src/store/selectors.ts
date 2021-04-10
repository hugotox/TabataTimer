import { createSelector } from 'reselect'
import { AppState } from 'store/slice'
import { WorkflowItem } from 'store/types'

export const selectInitialCountdown = (data: AppState) => data.initialCountdown

export const selectWarmup = (data: AppState) => data.warmup

export const selectNumSets = (data: AppState) => data.numSets

export const selectNumReps = (data: AppState) => data.numReps

export const selectExercise = (data: AppState) => data.exercise

export const selectRest = (data: AppState) => data.rest

export const selectRecovery = (data: AppState) => data.recovery

export const selectCooldown = (data: AppState) => data.coolDownInterval

export const selectCurrentState = (data: AppState) => data.currentState

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
    coolDownInterval,
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
    if (coolDownInterval) {
      workflow.push(['coolDownInterval', coolDownInterval])
    }
    console.log('workflow created', workflow)
    return workflow
  }
)

export const selectTotalDuration = createSelector(
  selectWorkflow,
  (workflow) => {
    let totalTime = 0 // in seconds

    workflow.forEach((item) => {
      totalTime += item[1]
    })

    return totalTime
  }
)
