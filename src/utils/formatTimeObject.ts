export const formatTimeObject = (time: {
  hours: number
  minutes: number
  seconds: number
}) => {
  const { hours, minutes, seconds } = time
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}:${String(seconds).padStart(2, '0')}`
}
