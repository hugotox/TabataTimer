export interface WorkflowItem {
  currentState: WorkoutStates
  duration: number
  currentInterval: number
  currentCycle: number
}
export interface CustomExerciseNames {
  [interval: number]: string
}

export interface CustomExercisePayload {
  interval: number
  name: string
}

export type ControlStates = 'stopped' | 'paused' | 'playing'

export type WorkoutStates =
  | 'initialCountdown'
  | 'warmup'
  | 'exercise'
  | 'rest'
  | 'recovery'
  | 'cooldownInterval'

// all times are in seconds
export interface TimerState {
  // "playing" states:
  initialCountdown: number
  warmup: number
  exercise: number
  rest: number
  recovery: number
  cooldownInterval: number

  // intervals settings
  numIntervals: number // 1 interval = exercise + rest
  numCycles: number

  // control
  currentState: ControlStates

  // presets
  currentPreset?: string
  customNames?: CustomExerciseNames
}

export type SettingsKeys = WorkoutStates | 'numCycles' | 'numIntervals'

export interface UpdatePayload {
  stateKey: SettingsKeys
  value: number
}

export interface PresetMeasures {
  exercise: number
  rest: number
  recovery: number
  numIntervals: number
  numCycles: number
}

export interface Preset {
  name: string
  description?: string
  measures: PresetMeasures
  customNames?: CustomExerciseNames
}
