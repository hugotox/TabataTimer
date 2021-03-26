import React from 'react'
import { RootStackParamList } from 'routes'
import { InitialCountdown } from 'screens/measures/initial-countdown'
import { WarmupInterval } from 'screens/measures/warmup-interval'
import { Load } from 'screens/presets/load'

export interface ItemType {
  icon: string
  route: keyof RootStackParamList
  component: React.ComponentType<any>
}

interface Sections {
  sectionLabel: string
  items: ItemType[]
}

export const MEASURES: Sections = {
  sectionLabel: 'Measures',
  items: [
    {
      icon: '⏱',
      route: 'Initial Countdown',
      component: InitialCountdown,
    },
    {
      icon: '🌤',
      route: 'Warmup Interval',
      component: WarmupInterval,
    },
    // {
    //   icon: '🏋️',
    //   label: EXERCISE_INTERVAL,
    //   route: '',
    // },
    // {
    //   icon: '😴',
    //   label: REST_INTERVAL,
    //   route: '',
    // },
    // {
    //   icon: '#️⃣',
    //   label: NUMBER_OF_SETS,
    //   route: '',
    // },
    // {
    //   icon: '⛑',
    //   label: RECOVERY_INTERVAL,
    //   route: '',
    // },
    // {
    //   icon: '♺',
    //   label: NUMBER_OF_CYCLES,
    //   route: '',
    // },
    // {
    //   icon: '⏱',
    //   label: COUNTDOWN_INTERVAL,
    //   route: '',
    // },
  ],
}

export const PRESETS: Sections = {
  sectionLabel: 'Presets',
  items: [
    {
      icon: '👉',
      route: 'Load',
      component: Load,
    },
    // {
    //   icon: '💾',
    //   label: SAVE,
    //   route: '',
    // },
    // {
    //   icon: '↕️',
    //   label: ARRANGE,
    //   route: '',
    // },
  ],
}
