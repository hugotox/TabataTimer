import { AppState } from 'store/slice'

export type RootStackParamList = {
  Main: undefined
  Settings: undefined
  'Initial Countdown': { stateKey: keyof AppState }
  'Warmup Interval': { stateKey: keyof AppState }
  'Exercise Interval': { stateKey: keyof AppState }
  'Rest Interval': { stateKey: keyof AppState }
  'Number of Sets': { stateKey: keyof AppState }
  'Recovery Interval': { stateKey: keyof AppState }
  'Number of Cycles': { stateKey: keyof AppState }
  'Cooldown Interval': { stateKey: keyof AppState }
  Load: undefined
  Save: undefined
  Arrange: undefined
}
