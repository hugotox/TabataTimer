import { toTimeObject } from 'utils/toTimeObject'

export const getTimeDurationLabel = (seconds: number) => {
  const time = toTimeObject(seconds)
  let value = ''

  if (time.minutes) {
    value += `${time.minutes} ${time.minutes === 1 ? 'minute ' : 'minutes '}`
  }
  if (time.seconds || value === '') {
    value += `${time.seconds} ${time.seconds === 1 ? 'second' : 'seconds'}`
  }
  return value
}
