import { SettingsKeys } from 'store/timerSlice'

export type RootStackParamList = {
  Main: undefined
  Settings: undefined
  'Initial Countdown': { stateKey: SettingsKeys }
  'Warmup Interval': { stateKey: SettingsKeys }
  'Exercise Interval': { stateKey: SettingsKeys }
  'Rest Interval': { stateKey: SettingsKeys }
  'Number of Reps': { stateKey: SettingsKeys }
  'Recovery Interval': { stateKey: SettingsKeys }
  'Number of Sets': { stateKey: SettingsKeys }
  'Cooldown Interval': { stateKey: SettingsKeys }
  Load: undefined
  Save: undefined
  Arrange: undefined
}
