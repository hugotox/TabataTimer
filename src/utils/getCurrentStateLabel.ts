import { ControlStates, WorkoutStates } from 'store/slice'

export const getCurrentStateLabel = (
  currentState: ControlStates | WorkoutStates,
) => {
  switch (currentState) {
    case 'initialCountdown': {
      return 'Countdown'
    }
    case 'warmup': {
      return 'Warmup'
    }
    case 'exercise': {
      return 'Exercise'
    }
    case 'rest': {
      return 'Rest'
    }
    case 'recovery': {
      return 'Recovery'
    }
    case 'coolDownInterval': {
      return 'Cooldown'
    }
    case 'completed': {
      return 'Completed!'
    }
    case 'stopped': {
      return ''
    }
    case 'paused': {
      return 'Paused'
    }
  }
}
