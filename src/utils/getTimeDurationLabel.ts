import { toTimeObject } from 'utils/toTimeObject'

export const getTimeDurationLabel = (
  seconds: number,
  short: boolean = false
) => {
  const time = toTimeObject(seconds)
  const minsSuffix = short ? 'min' : 'minute'
  const secsSuffix = short ? 'sec' : 'second'
  const hrSuffix = short ? 'hr' : 'hour'
  let value = ''

  if (time.hours) {
    value += `${time.hours} ${hrSuffix}${time.hours === 1 ? ' ' : 's '}`
  }
  if (time.minutes) {
    value += `${time.minutes} ${minsSuffix}${time.minutes === 1 ? ' ' : 's '}`
  }
  // hide the seconds if we have duration longer than 1 hr
  if (time.hours === 0 && (time.seconds || value === '')) {
    value += `${time.seconds} ${secsSuffix}${time.seconds === 1 ? '' : 's'}`
  }
  return value
}
