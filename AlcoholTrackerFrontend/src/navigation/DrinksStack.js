import { createStackNavigator } from '@react-navigation/stack';
import DrinksScreen from '../screens/main/drinks/DrinksScreen';
import DrinkDetailScreen from '../screens/main/drinks/drinkDetail/DrinkDetailScreen';
import AddDrinkScreen from '../screens/main/drinks/addDrink/AddDrinkScreen';

const Stack = createStackNavigator();

export default function DrinksStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="DrinksMain" component={DrinksScreen} />
      <Stack.Screen 
        name="DrinkDetail" 
        component={DrinkDetailScreen}
        options={{ 
          headerShown: true,
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          title: 'Детали напитка'
        }}
      />
      <Stack.Screen 
        name="AddDrink" 
        component={AddDrinkScreen}
        options={{ 
          headerShown: true,
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          title: 'Добавить напиток'
        }}
      />
    </Stack.Navigator>
  );
}