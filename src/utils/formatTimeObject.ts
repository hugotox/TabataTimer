export const formatTimeObject = (
  time: {
    hours: number
    minutes: number
    seconds: number
  },
  includeHours: boolean = false,
  includeMinutes: boolean = false,
  includeSeconds: boolean = true
) => {
  const { hours, minutes, seconds } = time
  const items = []
  if (includeHours) {
    items.push(String(hours).padStart(2, '0'))
  }
  if (includeMinutes) {
    items.push(String(minutes).padStart(2, '0'))
  }
  if (includeSeconds) {
    items.push(String(seconds).padStart(2, '0'))
  }
  return items.join(':')
}
