import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/main/profile/ProfileScreen';
import AccountDataScreen from '../screens/main/profile/AccountDataScreen';
import ParametersScreen from '../screens/main/profile/ParametersScreen'; 

const Stack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AccountDataScreen" 
        component={AccountDataScreen} 
        options={{ 
          title: 'Данные аккаунта',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
        }} 
      />
      <Stack.Screen 
        name="ParametersScreen" 
        component={ParametersScreen} 
        options={{ 
          title: 'Параметры',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
        }} 
      />
    </Stack.Navigator>
  );
}