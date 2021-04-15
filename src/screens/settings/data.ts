import { NumberInput } from 'components/NumberInput'
import { TimeInput } from 'components/TimeInput'
import React from 'react'
import { RootStackParamList } from 'routes'
import { Load } from 'screens/presets/load'
import { SettingsKeys } from 'store/timerSlice'

export interface ItemType {
  icon: string
  route: keyof RootStackParamList
  component: React.ComponentType<any>
  stateKey?: SettingsKeys
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
      component: TimeInput,
      stateKey: 'initialCountdown',
    },
    {
      icon: '🌤',
      route: 'Warmup Interval',
      component: TimeInput,
      stateKey: 'warmup',
    },
    {
      icon: '🏋️',
      route: 'Exercise Interval',
      component: TimeInput,
      stateKey: 'exercise',
    },
    {
      icon: '😴',
      route: 'Rest Interval',
      component: TimeInput,
      stateKey: 'rest',
    },
    {
      icon: '#️⃣',
      route: 'Number of Rounds',
      component: NumberInput,
      stateKey: 'numRounds',
    },
    {
      icon: '⛑',
      route: 'Recovery Interval',
      component: TimeInput,
      stateKey: 'recovery',
    },
    {
      icon: '♻️',
      route: 'Number of Cycles',
      component: NumberInput,
      stateKey: 'numCycles',
    },
    {
      icon: '⏱',
      route: 'Cooldown Interval',
      component: TimeInput,
      stateKey: 'cooldownInterval',
    },
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
    {
      icon: '💾',
      route: 'Save',
      component: Load,
    },
    {
      icon: '↕️',
      route: 'Arrange',
      component: Load,
    },
  ],
}
