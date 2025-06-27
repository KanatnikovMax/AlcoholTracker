import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import AuthStack from './AuthStack'
import MainTabNavigator from './MainTabNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'

const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
        {userToken !== null ? <MainTabNavigator/> : <AuthStack />}
    </NavigationContainer>
  )
}

export default AppNav;