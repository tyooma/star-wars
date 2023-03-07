import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home'
import CharacterDetails from '../screens/CharacterDetails'

const Stack = createNativeStackNavigator()

const HomeStack = () => (
  <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen
      name='Home'
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='CharacterDetails'
      component={CharacterDetails}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
)

const Navigation = () => <HomeStack />

export default Navigation
