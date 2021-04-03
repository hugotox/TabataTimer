import { WorkoutStates } from 'store/slice'

export const getCurrentWorkoutLabel = (state: WorkoutStates) => {
  switch (state) {
    case 'initialCountdown': {
      return 'COUNTDOWN'
    }
    case 'coolDownInterval': {
      return 'COOLDOWN'
    }
  }
  return state.toUpperCase()
}
