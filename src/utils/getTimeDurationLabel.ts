import { TimeObject } from 'components/TimeInput'

export const getTimeDurationLabel = (time: TimeObject) => {
  let value = ''

  if (time.minutes) {
    value += `${time.minutes} ${time.minutes === 1 ? 'minute ' : 'minutes '}`
  }
  if (time.seconds || value === '') {
    value += `${time.seconds} ${time.seconds === 1 ? 'second' : 'seconds'}`
  }
  return value
}
