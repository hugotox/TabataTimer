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
  switch (state) {
    case 'initialCountdown': {
      return 'countdown'
    }
    case 'cooldownInterval': {
      return 'cooldown'
    }
  }
  const intervalKey = numIntervals - currentInterval + 1
  if (state === 'exercise' && customNames?.[intervalKey]) {
    return customNames?.[intervalKey].toLowerCase()
  }
  return state.toLowerCase()
}
