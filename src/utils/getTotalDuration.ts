import { AppState } from 'store/slice'
import { createWorkflow } from 'utils/createWorkflow'

/**
 * Returns the workout total duration in seconds
 * @param {AppState} data workout data
 * @returns {number} duration in seconds
 */
export const getTotalDuration = (data: AppState): number => {
  const workflow = createWorkflow(data)
  let totalTime = 0 // in seconds

  workflow.forEach((item) => {
    totalTime += item[1]
  })

  return totalTime
}
