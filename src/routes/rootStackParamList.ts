import { SettingsKeys } from 'store/timerSlice'

export type RootStackParamList = {
  Main: undefined
  Settings: undefined
  'Initial Countdown': { stateKey: SettingsKeys }
  'Warmup Interval': { stateKey: SettingsKeys }
  'Exercise Interval': { stateKey: SettingsKeys }
  'Rest Interval': { stateKey: SettingsKeys }
  'Number of Rounds': { stateKey: SettingsKeys }
  'Recovery Interval': { stateKey: SettingsKeys }
  'Number of Cycles': { stateKey: SettingsKeys }
  'Cooldown Interval': { stateKey: SettingsKeys }
  Load: undefined
  'Edit Presets': undefined
}
