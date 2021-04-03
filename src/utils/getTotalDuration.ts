import { AppState } from 'store/slice'

/**
 * Returns the workout total duration in seconds
 * @param {AppState} data workout data
 * @returns {number} duration in seconds
 */
export const getTotalDuration = (data: AppState) => {
  const {
    initialCountdown,
    warmup,
    exercise,
    rest,
    numSets,
    recovery,
    numReps,
    coolDownInterval,
  } = data

  let totalTime = 0 // in seconds

  // add initial, warmup and cooldown times
  totalTime += initialCountdown + warmup + coolDownInterval

  // add one set time multiplied by number of reps
  const allSetsTime = (exercise + rest) * numReps

  totalTime += (allSetsTime + recovery) * numSets

  return totalTime
}
