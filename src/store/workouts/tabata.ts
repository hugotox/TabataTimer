import { TimerState } from 'store/timerSlice'

export const tabata: TimerState = {
  initialCountdown: 7,
  warmup: 0,
  exercise: 20,
  rest: 10,
  recovery: 0,
  cooldownInterval: 0,
  numRounds: 8,
  numCycles: 5,
  currentState: 'stopped',
}
