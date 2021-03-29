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
    numCycles,
    coolDownInterval,
  } = data

  let totalTime = 0 // in seconds

  // add initial, warmup and cooldown times
  totalTime += initialCountdown + warmup + coolDownInterval

  // add one set time multiplied by number of sets
  const allSetsTime = (exercise + rest) * numSets

  totalTime += (allSetsTime + recovery) * numCycles

  return totalTime
}
