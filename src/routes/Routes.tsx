import { createStackNavigator } from '@react-navigation/stack'
import { BackButton } from 'components/BackButton'
import { SaveButton } from 'components/SaveButton'
import React from 'react'
import { RootStackParamList } from 'routes/rootStackParamList'
import { Main } from 'screens/main'
import { MEASURES, PRESETS, Settings } from 'screens/settings'

const Stack = createStackNavigator<RootStackParamList>()

export const Routes = () => {
  const items = MEASURES.items.concat(PRESETS.items)
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerBackImage: () => <SaveButton />,
          headerBackTitleVisible: false,
        }}
      />
      {items.map((item) => (
        <Stack.Screen
          key={item.route}
          initialParams={{ stateKey: item.stateKey }}
          name={item.route}
          component={item.component}
          options={{
            headerBackImage: () => <BackButton />,
            headerBackTitleVisible: false,
          }}
        />
      ))}
    </Stack.Navigator>
  )
}
