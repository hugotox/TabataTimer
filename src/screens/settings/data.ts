import { SectionListData } from 'react-native'

export const MEASURES = 'Measures'
export const PRESETS = 'Presets'

export const SECTIONS = [
  {
    title: MEASURES,
    data: [
      '⏱-Initial Countdown',
      '🌤-Warmup Interval',
      '🏋️-Exercise Interval',
      '😴-Rest Interval',
      '#️⃣-Number of Sets',
      '⛑-Recovery Interval',
      '♺-Number of Cycles',
      '⏱-Countdown Interval',
    ],
  },
  {
    title: PRESETS,
    data: ['👉-Load', '💾-Save', '↕️-Arrange'],
  },
]

export type Section = SectionListData<
  string,
  {
    title: string
    data: string[]
  }
>
