import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { Input } from './screens/input'
import { Main } from './screens/main'
import { Settings } from './screens/settings'

function getHeaderTitle(route: any) {
  const routeName = route?.name ?? 'Main'
  const { params } = route ?? {}

  switch (routeName) {
    case 'Input':
      return params.section.data[params.index].split('-')[1]
    default:
      return 'Mains'
  }
}

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen
          name="Input"
          component={Input}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
