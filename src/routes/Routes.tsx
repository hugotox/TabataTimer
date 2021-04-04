import { createStackNavigator } from '@react-navigation/stack'
import { BackButton } from 'components/BackButton'
import { SaveButton } from 'components/SaveButton'
import React from 'react'
import { StyleSheet } from 'react-native'
import { RootStackParamList } from 'routes/rootStackParamList'
import { Main } from 'screens/main'
import { MEASURES, PRESETS, Settings } from 'screens/settings'
import { Colors } from 'themeConstants'

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
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
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
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
          }}
        />
      ))}
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.background,
    shadowColor: Colors.separator, //'transparent',
  },
  headerTitleStyle: {
    color: Colors.textDefault,
  },
})
