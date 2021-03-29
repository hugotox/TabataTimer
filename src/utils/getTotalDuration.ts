import { AppState } from 'store/slice'

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
  totalTime +=
    initialCountdown.minutes * 60 +
    initialCountdown.seconds +
    warmup.minutes * 60 +
    warmup.seconds +
    coolDownInterval.minutes * 60 +
    coolDownInterval.seconds

  // add one set time multiplied by number of sets
  const allSetsTime =
    (exercise.minutes * 60 +
      exercise.seconds +
      rest.minutes * 60 +
      rest.seconds) *
    numSets

  totalTime +=
    (allSetsTime + recovery.minutes * 60 + recovery.seconds) * numCycles

  return totalTime
}
