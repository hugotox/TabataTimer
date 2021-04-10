import { WorkoutStates } from 'store/slice'

export const getCurrentWorkoutLabel = (state: WorkoutStates) => {
  switch (state) {
    case 'initialCountdown': {
      return 'countdown'
    }
    case 'cooldownInterval': {
      return 'cooldown'
    }
  }
  return state.toLowerCase()
}
