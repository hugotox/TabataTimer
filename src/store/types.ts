import { WorkoutStates } from 'store/timerSlice'

export type WorkflowItem = [WorkoutStates, number]

export interface CustomExerciseNames {
  [interval: number]: string
}

export interface CustomExerciseName {
  interval: number
  name: string
}
