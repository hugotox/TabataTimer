import { NumberInput } from 'components/NumberInput'
import { TimeInput } from 'components/TimeInput'
import React from 'react'
import { RootStackParamList } from 'routes'
import { SettingsKeys } from 'store/types'

export interface ItemType {
  icon: string
  route: keyof RootStackParamList
  component: React.ComponentType<any>
  stateKey?: SettingsKeys
  description?: string
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
      route: 'Warmup',
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
      route: 'Rest',
      component: TimeInput,
      stateKey: 'rest',
    },
    {
      icon: '#️⃣',
      route: 'Number of Intervals',
      component: NumberInput,
      stateKey: 'numIntervals',
    },
    {
      icon: '⛑',
      route: 'Recovery',
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
      route: 'Cooldown',
      component: TimeInput,
      stateKey: 'cooldownInterval',
    },
  ],
}
