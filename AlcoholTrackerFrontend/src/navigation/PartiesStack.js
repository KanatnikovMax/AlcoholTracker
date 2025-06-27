import { createStackNavigator } from '@react-navigation/stack';
import PartiesScreen from '../screens/main/parties/PartiesScreen';
import NewPartyScreen from '../screens/main/parties/NewPartyScreen';
import PartyDetailsScreen from '../screens/main/parties/PartyDetailsScreen';
import CalculationResultScreen from '../screens/main/parties/CalculationResultScreen';

const Stack = createStackNavigator();

export default function PartiesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PartiesMain" 
        component={PartiesScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="NewParty" 
        component={NewPartyScreen} 
        options={{ 
          title: 'Новая вечеринка',
          headerShown: true,
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          animation: 'slide_from_right',
        }} 
      />

      <Stack.Screen 
        name="PartyDetails" 
        component={PartyDetailsScreen} 
        options={{ 
          title: 'Детали вечеринки',
          headerShown: true,
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
        }} 
      />
      <Stack.Screen 
        name="CalculationResult" 
        component={CalculationResultScreen} 
        options={{ 
          title: 'Результаты расчёта',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
        }} 
      />
    </Stack.Navigator>
  );
};