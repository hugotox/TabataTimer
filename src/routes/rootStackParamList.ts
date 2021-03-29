import { AppStateKeys } from 'store/slice'

export type RootStackParamList = {
  Main: undefined
  Settings: undefined
  'Initial Countdown': { stateKey: AppStateKeys }
  'Warmup Interval': { stateKey: AppStateKeys }
  'Exercise Interval': { stateKey: AppStateKeys }
  'Rest Interval': { stateKey: AppStateKeys }
  'Number of Sets': { stateKey: AppStateKeys }
  'Recovery Interval': { stateKey: AppStateKeys }
  'Number of Cycles': { stateKey: AppStateKeys }
  'Cooldown Interval': { stateKey: AppStateKeys }
  Load: undefined
  Save: undefined
  Arrange: undefined
}
