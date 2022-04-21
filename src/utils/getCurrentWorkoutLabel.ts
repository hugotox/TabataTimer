import { CustomExerciseNames, WorkflowItem } from 'store/types'

interface Params {
  customNames?: CustomExerciseNames
  numIntervals: number
  currentInterval: number
  currentWorkflowItem: number
  workflow: WorkflowItem[]
}

export const getCurrentWorkoutLabel = ({
  customNames,
  numIntervals,
  currentInterval,
  currentWorkflowItem,
  workflow,
}: Params) => {
  if (
    workflow.length &&
    currentWorkflowItem >= 0 &&
    workflow[currentWorkflowItem]?.currentState
  ) {
    const state = workflow[currentWorkflowItem].currentState
    const intervalKey = numIntervals - currentInterval + 1
    let next = ''
    if (currentInterval === 0) {
      next = customNames?.[1]?.toLowerCase() ?? ''
    } else {
      next = customNames?.[intervalKey]?.toLowerCase() ?? ''
    }
    switch (state) {
      case 'initialCountdown': {
        if (workflow[1].currentState === 'warmup') {
          return { current: 'countdown', next: 'warmup' }
        } else {
          return { current: 'countdown', next }
        }
      }
      case 'warmup': {
        return { current: 'warmup', next }
      }
      case 'cooldownInterval': {
        return { current: 'cooldown', next: '' }
      }
    }

    if (state === 'exercise' && customNames?.[intervalKey]) {
      return { current: customNames?.[intervalKey].toLowerCase(), next: '' }
    }
    return { current: state.toLowerCase(), next }
  } else {
    return { current: '', next: '' }
  }
}
