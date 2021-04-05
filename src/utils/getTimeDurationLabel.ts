import { toTimeObject } from 'utils/toTimeObject'

export const getTimeDurationLabel = (
  seconds: number,
  short: boolean = false
) => {
  const time = toTimeObject(seconds)
  const minsSuffix = short ? 'min' : 'minute'
  const secsSuffix = short ? 'sec' : 'second'
  let value = ''

  if (time.minutes) {
    value += `${time.minutes} ${minsSuffix}${time.minutes === 1 ? ' ' : 's '}`
  }
  if (time.seconds || value === '') {
    value += `${time.seconds} ${secsSuffix}${time.seconds === 1 ? '' : 's'}`
  }
  return value
}
