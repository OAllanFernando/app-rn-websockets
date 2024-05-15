// Navigation.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Index from '../login/Index';
import Routes from '../constants/Routes';


const Stack = createStackNavigator();

function LoginNavigator() {
  return (
      <Stack.Navigator initialRouteName={Routes.LOGIN} >
          <Stack.Screen name={Routes.LOGIN} component={Index} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default LoginNavigator;