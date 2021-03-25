export const SECTIONS = {
  measures: 'Measures',
  presets: 'Presets',
}

export const INITIAL_COUNTDOWN = 'Initial Countdown'
export const WARMUP_INTERVAL = 'Warmup Interval'
export const EXERCISE_INTERVAL = 'Exercise Interval'
export const REST_INTERVAL = 'Rest Interval'
export const NUMBER_OF_SETS = 'Number of Sets'
export const RECOVERY_INTERVAL = 'Recovery Interval'
export const NUMBER_OF_CYCLES = 'Number of Cycles'
export const COUNTDOWN_INTERVAL = 'Countdown Interval'
export const LOAD = 'Load'
export const SAVE = 'Save'
export const ARRANGE = 'Arrange'

export const MEASURES = {
  sectionLabel: SECTIONS.measures,
  items: [
    {
      icon: '⏱',
      label: INITIAL_COUNTDOWN,
    },
    {
      icon: '🌤',
      label: WARMUP_INTERVAL,
    },
    {
      icon: '🏋️',
      label: EXERCISE_INTERVAL,
    },
    {
      icon: '😴',
      label: REST_INTERVAL,
    },
    {
      icon: '#️⃣',
      label: NUMBER_OF_SETS,
    },
    {
      icon: '⛑',
      label: RECOVERY_INTERVAL,
    },
    {
      icon: '♺',
      label: NUMBER_OF_CYCLES,
    },
    {
      icon: '⏱',
      label: COUNTDOWN_INTERVAL,
    },
  ],
}

export const PRESETS = {
  sectionLabel: SECTIONS.presets,
  items: [
    {
      icon: '👉',
      label: LOAD,
    },
    {
      icon: '💾',
      label: SAVE,
    },
    {
      icon: '↕️',
      label: ARRANGE,
    },
  ],
}

export type ItemType = typeof MEASURES.items[0]
