import { InputRouteProp } from 'screens/input'

import { Section } from '../screens/settings'

export type RootStackParamList = {
  Main: undefined
  Settings: undefined
  Input: {
    section: Section
    index: number
  }
}

export const getHeaderTitle = (route: InputRouteProp) => {
  const routeName = route?.name ?? 'Main'
  const { params } = route ?? {}

  switch (routeName) {
    case 'Input':
      return params.section.data[params.index].split('-')[1]
    default:
      return 'Main'
  }
}
