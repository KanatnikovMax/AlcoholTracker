import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ animation: 'slide_from_left' }}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{ animation: 'slide_from_right' }}/>
    </Stack.Navigator>
  );
};

export default AuthStack;