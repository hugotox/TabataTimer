import { InputRouteProp } from 'screens/input'

import { ItemType } from '../screens/settings'

export type RootStackParamList = {
  Main: undefined
  Settings: undefined
  Input: {
    section: string
    item: ItemType
  }
}

export const getHeaderTitle = (route: InputRouteProp) => {
  const routeName = route?.name ?? 'Main'
  const { params } = route ?? {}

  switch (routeName) {
    case 'Input':
      return params.item.label
    default:
      return 'Main'
  }
}
