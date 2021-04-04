import { WorkoutStates } from 'store/slice'

export const getCurrentWorkoutLabel = (state: WorkoutStates) => {
  switch (state) {
    case 'initialCountdown': {
      return 'countdown'
    }
    case 'coolDownInterval': {
      return 'cooldown'
    }
  }
  return state.toLowerCase()
}
