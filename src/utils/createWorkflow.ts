import { AppState, WorkoutStates } from 'store/slice'

export type WorkflowItem = [WorkoutStates, number]

export const createWorkflow = (data: AppState) => {
  const workflow: WorkflowItem[] = []
  if (data.initialCountdown) {
    workflow.push(['initialCountdown', data.initialCountdown])
  }
  if (data.warmup) {
    workflow.push(['warmup', data.warmup])
  }
  for (let set = 1; set <= data.numSets; set++) {
    for (let rep = 1; rep <= data.numReps; rep++) {
      if (data.exercise) {
        workflow.push(['exercise', data.exercise])
      }
      if (data.rest) {
        if (rep < data.numReps) {
          workflow.push(['rest', data.rest])
        } else if (!data.recovery) {
          workflow.push(['rest', data.rest])
        }
      }
    }
    if (data.recovery) {
      workflow.push(['recovery', data.recovery])
    }
  }
  if (data.coolDownInterval) {
    workflow.push(['coolDownInterval', data.coolDownInterval])
  }
  return workflow
}
