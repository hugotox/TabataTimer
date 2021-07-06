import { WorkoutStates, CustomExerciseNames } from 'store/types'

interface Params {
  state: WorkoutStates
  customNames?: CustomExerciseNames
  numIntervals: number
  currentInterval: number
}

export const getCurrentWorkoutLabel = ({
  state,
  customNames,
  numIntervals,
  currentInterval,
}: Params) => {
  const intervalKey = numIntervals - currentInterval + 1
  let next = ''
  if (currentInterval === 0) {
    next = customNames?.[1]?.toLowerCase() ?? ''
  } else {
    next = customNames?.[intervalKey]?.toLowerCase() ?? ''
  }
  switch (state) {
    case 'initialCountdown': {
      return { current: 'countdown', next }
    }
    case 'cooldownInterval': {
      return { current: 'cooldown', next }
    }
  }

  if (state === 'exercise' && customNames?.[intervalKey]) {
    return { current: customNames?.[intervalKey].toLowerCase(), next: '' }
  }
  return { current: state.toLowerCase(), next }
}
