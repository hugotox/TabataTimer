import { SettingsKeys } from 'store/timerSlice'

export type RootStackParamList = {
  Main: undefined
  Settings: undefined
  'Initial Countdown': { stateKey: SettingsKeys }
  Warmup: { stateKey: SettingsKeys }
  Exercise: { stateKey: SettingsKeys }
  Rest: { stateKey: SettingsKeys }
  'Number of Intervals': { stateKey: SettingsKeys }
  Recovery: { stateKey: SettingsKeys }
  'Number of Reps': { stateKey: SettingsKeys }
  Cooldown: { stateKey: SettingsKeys }
  Load: undefined
  'Edit Presets': undefined
  Customize: undefined
}
