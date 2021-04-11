import { WorkoutStates } from 'store/timerSlice'

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
