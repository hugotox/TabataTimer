import { Background } from 'components/Background/Background'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Load = () => {
  return (
    <SafeAreaView>
      <Background />
      <Text>Load screen</Text>
    </SafeAreaView>
  )
}
